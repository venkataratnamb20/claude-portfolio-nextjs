import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Open-source AI/ML projects John Doe has contributed to — including LangChain, LlamaIndex, CrewAI, Hugging Face Transformers, AutoGPT, and FastAPI.',
  openGraph: {
    title: 'Projects — John Doe',
    description: 'Open-source AI/ML contributions by John Doe.',
  },
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section
        className="relative py-20 mb-8 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, rgba(17,17,24,0.8) 0%, transparent 100%)' }}
      >
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full blur-[120px] pointer-events-none"
          style={{ background: 'rgba(0,212,255,0.05)' }}
        />
        <div className="container-custom relative z-10 text-center">
          <AnimatedSection immediate>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary opacity-60" />
              <span className="section-label">Open source</span>
              <div className="h-px w-12 bg-primary opacity-60" />
            </div>
            <h1 className="heading-xl mb-6">
              <span className="text-gradient">Projects</span> &{' '}
              Contributions
            </h1>
            <p className="text-text-muted text-xl max-w-2xl mx-auto leading-relaxed">
              25+ years of open-source work. These are the AI/ML frameworks I&apos;ve contributed to —
              tools used by millions of developers worldwide.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats bar */}
      <AnimatedSection immediate delay={0.2}>
        <div className="container-custom mb-14">
          <div
            className="rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ background: 'rgba(26,26,46,0.5)', border: '1px solid var(--card-border)' }}
          >
            {[
              { value: '6', label: 'Major Projects' },
              { value: '500k+', label: 'Combined Stars' },
              { value: '150+', label: 'Merged PRs' },
              { value: '3', label: 'Core Frameworks' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-2xl text-gradient">{stat.value}</div>
                <div className="text-muted text-xs font-mono mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Projects grid */}
      <section className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </section>
    </div>
  )
}
