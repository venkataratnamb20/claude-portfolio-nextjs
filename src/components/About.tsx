'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import { personalInfo, stats } from '@/data/resume'

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'rgba(124,58,237,0.05)' }}
      />

      <div className="container-custom">
        <AnimatedSection className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-12 bg-primary opacity-60" />
            <span className="section-label">About me</span>
          </div>
          <h2 className="heading-lg">
            The architect behind the{' '}
            <span className="text-gradient">intelligence</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Photo + stats */}
          <AnimatedSection direction="left">
            <div className="relative">
              {/* Profile image */}
              <div className="relative w-full max-w-sm mx-auto lg:mx-0">
                <div
                  className="absolute -inset-1 rounded-2xl blur-sm"
                  style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(124,58,237,0.3))' }}
                />
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                  <Image
                    src={personalInfo.profileImage}
                    alt="John Doe — Senior AI/ML Architect"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 384px"
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(10,10,15,0.8) 100%)' }}
                  />
                  {/* Name badge overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div
                      className="rounded-xl p-4"
                      style={{ background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,212,255,0.2)' }}
                    >
                      <div className="font-display font-bold text-text text-lg">John Doe</div>
                      <div className="text-primary text-sm font-mono mt-0.5">Senior AI/ML Architect</div>
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-text-muted text-xs">Open to consulting</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating tech badges */}
              <motion.div
                className="absolute -right-4 top-1/4 hidden lg:block"
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="card-base px-4 py-2 text-xs font-mono text-primary shadow-card">
                  🧠 LangChain Expert
                </div>
              </motion.div>
              <motion.div
                className="absolute -left-4 bottom-1/3 hidden lg:block"
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <div className="card-base px-4 py-2 text-xs font-mono text-accent-bright shadow-card">
                  🚀 150+ OSS PRs
                </div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Right: Bio + stats */}
          <AnimatedSection direction="right" delay={0.1}>
            <div className="space-y-6">
              <p className="text-text-muted text-lg leading-relaxed">
                With over <strong className="text-text">25 years</strong> at the bleeding edge of
                artificial intelligence, I&apos;ve had the privilege of witnessing — and shaping — the
                evolution from early statistical models to today&apos;s remarkable LLM ecosystems.
              </p>
              <p className="text-text-muted leading-relaxed">
                My journey began at <strong className="text-text">IIT Hyderabad</strong>, where I
                developed a deep fascination with the mathematics of uncertainty. From my first role at
                TCS building data pipelines, through leading AI labs at Infosys, to architecting enterprise
                LLM platforms serving <strong className="text-text">50M+ requests daily</strong>, I&apos;ve
                always been driven by one question: how do we make machines genuinely useful?
              </p>
              <p className="text-text-muted leading-relaxed">
                Today, I focus on <strong className="text-primary">agentic AI systems</strong> —
                orchestrating multiple AI agents to tackle complex, multi-step real-world problems.
                I&apos;ve contributed thousands of lines to open-source projects that power AI applications
                worldwide, and I mentor the next generation of ML engineers.
              </p>

              {/* Tech stack highlight */}
              <div
                className="rounded-xl p-5"
                style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.12)' }}
              >
                <div className="section-label mb-3">Current focus</div>
                <div className="flex flex-wrap gap-2">
                  {['LangChain', 'LlamaIndex', 'CrewAI', 'PyTorch', 'FastAPI', 'RAG', 'RLHF', 'Multi-Agent'].map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="card-base p-4 text-center"
                  >
                    <div className="font-display font-bold text-2xl text-gradient mb-1">
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="text-muted text-xs leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
