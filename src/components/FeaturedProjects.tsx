import Link from 'next/link'
import AnimatedSection from './AnimatedSection'
import ProjectCard from './ProjectCard'
import { featuredProjects } from '@/data/projects'

export default function FeaturedProjects() {
  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(17,17,24,0.4) 50%, transparent 100%)' }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.15), transparent)' }}
      />

      <div className="container-custom relative z-10">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12 bg-primary opacity-60" />
              <span className="section-label">Open source</span>
            </div>
            <h2 className="heading-lg">
              Featured{' '}
              <span className="text-gradient">contributions</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="btn-outline text-sm py-2.5 self-start sm:self-auto"
          >
            View All Projects
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
