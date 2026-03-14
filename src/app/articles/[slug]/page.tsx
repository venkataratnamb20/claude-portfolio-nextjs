import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { marked } from 'marked'
import { articles, getArticleBySlug } from '@/data/articles'
import AnimatedSection from '@/components/AnimatedSection'
import ArticleCard from '@/components/ArticleCard'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | John Doe`,
      description: article.excerpt,
      images: [{ url: article.image, width: 1200, height: 630, alt: article.title }],
    },
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const contentHtml = marked(article.content) as string

  const related = articles
    .filter((a) => a.id !== article.id && a.tags.some((t) => article.tags.includes(t)))
    .slice(0, 3)

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero image */}
      <div className="relative w-full h-[40vh] min-h-[280px] max-h-[480px] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.7) 70%, rgba(10,10,15,1) 100%)',
          }}
        />
      </div>

      <div className="container-custom">
        {/* Back link */}
        <AnimatedSection className="mt-8 mb-10">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-sm font-mono"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Articles
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          {/* Main content */}
          <div>
            <AnimatedSection>
              {/* Project badge */}
              <div className="mb-4">
                <Link
                  href={`/projects`}
                  className="tech-tag inline-flex items-center gap-1.5"
                >
                  {article.projectTitle}
                </Link>
              </div>

              {/* Title */}
              <h1
                className="font-display font-bold text-text leading-tight mb-5"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
              >
                {article.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
                <span className="text-text-muted text-sm font-mono">{formatDate(article.date)}</span>
                <span className="text-border">·</span>
                <span className="text-text-muted text-sm font-mono">{article.readTime}</span>
                <span className="text-border">·</span>
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Excerpt */}
              <p className="text-text-muted text-lg leading-relaxed mb-10 italic">
                {article.excerpt}
              </p>

              {/* Article body */}
              <article
                className="article-content"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <aside>
            <AnimatedSection delay={0.15} className="sticky top-28 space-y-6">
              {/* Author card */}
              <div
                className="rounded-xl p-5"
                style={{ background: 'rgba(26,26,46,0.8)', border: '1px solid var(--card-border)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                      alt="John Doe"
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <div className="font-display font-bold text-text text-sm">John Doe</div>
                    <div className="text-primary text-xs font-mono mt-0.5">AI/ML Architect</div>
                  </div>
                </div>
                <p className="text-text-muted text-xs leading-relaxed">
                  Senior AI/ML Architect with 25+ years of experience. Open-source contributor
                  to LangChain, LlamaIndex, and Hugging Face Transformers.
                </p>
                <div className="flex gap-2 mt-4">
                  <a
                    href="https://github.com/johndoe-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 text-center text-xs font-mono rounded-lg transition-colors hover:text-primary"
                    style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)' }}
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/johndoe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 text-center text-xs font-mono rounded-lg transition-colors hover:text-primary"
                    style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)' }}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Tags */}
              <div
                className="rounded-xl p-5"
                style={{ background: 'rgba(26,26,46,0.8)', border: '1px solid var(--card-border)' }}
              >
                <div className="section-label mb-3">Topics</div>
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </aside>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-20">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-12 bg-primary opacity-60" />
                <span className="section-label">Keep reading</span>
              </div>
              <h2 className="heading-lg mb-10">
                Related <span className="text-gradient">articles</span>
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((a, idx) => (
                <ArticleCard key={a.id} article={a} index={idx} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
