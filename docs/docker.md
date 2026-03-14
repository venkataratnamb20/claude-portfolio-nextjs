# Docker Setup — Portfolio App

## Overview

This document covers the production Docker setup for the Next.js portfolio application. The image is built using a **3-stage multi-stage Dockerfile** and outputs a minimal, secure, production-ready container (~51 MB).

---

## Files

| File | Purpose |
|---|---|
| `Dockerfile` | Multi-stage build definition |
| `.dockerignore` | Excludes files from the build context |
| `next.config.mjs` | Enables `output: 'standalone'` for minimal runtime output |

---

## Architecture: Multi-Stage Build

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Stage 1    │     │  Stage 2    │     │  Stage 3    │
│    deps     │────▶│   builder   │────▶│   runner    │
│             │     │             │     │             │
│ npm ci      │     │ next build  │     │ node        │
│ node_modules│     │ .next/      │     │ server.js   │
└─────────────┘     └─────────────┘     └─────────────┘
  discarded           discarded           ~51 MB final
```

### Stage 1 — `deps`

Installs all dependencies (including `devDependencies`) needed to compile the app. This stage is discarded after the build; its `node_modules` are never present in the final image.

- Base: `node:20-alpine`
- Adds `libc6-compat` for glibc compatibility with native Node addons
- Copies only lock files first to maximize Docker layer cache reuse — `npm ci` only reruns when `package.json` or `package-lock.json` changes

### Stage 2 — `builder`

Runs `next build` with `NODE_ENV=production`. With `output: 'standalone'` set in `next.config.mjs`, Next.js traces the exact files required at runtime and writes them to `.next/standalone/` — a self-contained directory with its own minimal `node_modules`.

- Inherits `node_modules` from Stage 1
- Sets `NEXT_TELEMETRY_DISABLED=1` to suppress build-time telemetry
- Discarded after build; only the `.next/standalone` and `.next/static` outputs are carried forward

### Stage 3 — `runner`

The final production image. Contains only what is needed to serve the app:

```
/app/
├── server.js              ← Next.js standalone entrypoint
├── node_modules/          ← Minimal traced deps only (~5 MB)
└── .next/
    └── static/            ← CSS, JS chunks, fonts, media
```

- Base: `node:20-alpine` (~50 MB)
- Runs as a non-root system user (`nextjs:nodejs`, UID/GID 1001)
- No build tools, no source code, no dev dependencies

---

## Optimizations

### Image Size
| Approach | Estimated Size |
|---|---|
| Default `node:20` + full `node_modules` | ~1.5 GB |
| `node:20-alpine` + full `node_modules` | ~400 MB |
| `node:20-alpine` + standalone output | **~51 MB** |

### Layer Caching

Dependencies are installed in a separate stage before source code is copied. This means:

- A code-only change → skips `npm ci`, rebuilds only from `COPY . .`
- A dependency change → reruns `npm ci` and everything after

### `output: 'standalone'`

Configured in `next.config.mjs`:

```js
const nextConfig = {
  output: 'standalone',
  // ...
};
```

Next.js uses `@vercel/nft` (Node File Tracing) to statically analyze imports and copy only the files actually required at runtime into `.next/standalone/`. This is the single biggest driver of the small final image size.

### Security

- **Non-root user**: The container runs as `nextjs` (UID 1001). Even if a vulnerability is exploited, the process has no elevated privileges.
- **No shell tools in final image**: The runner stage installs nothing beyond what Alpine and Node provide.
- **Telemetry disabled**: `NEXT_TELEMETRY_DISABLED=1` prevents outbound calls to Vercel's telemetry endpoint at both build and runtime.

---

## Usage

### Build

```bash
docker build -t portfolio-app:prod .
```

### Run

```bash
docker run -p 3000:3000 portfolio-app:prod
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Custom Port

```bash
docker run -e PORT=8080 -p 8080:8080 portfolio-app:prod
```

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `NODE_ENV` | `production` | Node environment |
| `PORT` | `3000` | Port the server listens on |
| `HOSTNAME` | `0.0.0.0` | Bind address |
| `NEXT_TELEMETRY_DISABLED` | `1` | Disables Next.js telemetry |

Pass additional runtime variables with `-e`:

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://api.example.com \
  portfolio-app:prod
```

### Docker Compose

```yaml
services:
  app:
    image: portfolio-app:prod
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

---

## Healthcheck

The Dockerfile includes a built-in Docker healthcheck:

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1
```

| Parameter | Value | Meaning |
|---|---|---|
| `--interval` | 30s | Check every 30 seconds |
| `--timeout` | 5s | Fail if no response within 5s |
| `--start-period` | 10s | Grace period on container start |
| `--retries` | 3 | Mark unhealthy after 3 consecutive failures |

Inspect health status:

```bash
docker inspect --format='{{.State.Health.Status}}' <container_id>
```

---

## Package Manager Support

The Dockerfile auto-detects the package manager from the lock file:

| Lock file present | Command used |
|---|---|
| `package-lock.json` | `npm ci` |
| `yarn.lock` | `yarn install --frozen-lockfile` |
| `pnpm-lock.yaml` | `pnpm install --frozen-lockfile` |
| none | `npm install` |

---

## .dockerignore

The `.dockerignore` file keeps the build context lean by excluding:

```
.git
.next          ← rebuilt inside Docker, not copied from host
node_modules   ← installed fresh inside Docker
Dockerfile
.dockerignore
docs/
*.md
.eslintrc*
.env*.local    ← never bake secrets into the image
```

> **Security note**: Never add `.env` files or secrets to the Docker image. Pass secrets at runtime via environment variables or a secrets manager (AWS Secrets Manager, Docker Secrets, etc.).

---

## CI/CD Integration

### GitHub Actions example

```yaml
- name: Build and push Docker image
  uses: docker/build-push-action@v5
  with:
    context: .
    push: true
    tags: ghcr.io/${{ github.repository }}:${{ github.sha }}
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

### Build for multiple platforms

```bash
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t portfolio-app:prod \
  --push .
```
