import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'
import ArticleCard from '@/components/ArticleCard'
import { articles } from '@/data/articles'

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Technical articles by John Doe on LLM orchestration, agentic AI systems, RAG architecture, and open-source ML frameworks.',
  openGraph: {
    title: 'Articles — John Doe',
    description: 'Deep dives into production AI/ML systems by John Doe.',
  },
}

export default function ArticlesPage() {
  const allTags = Array.from(new Set(articles.flatMap((a) => a.tags))).sort()

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
          style={{ background: 'rgba(124,58,237,0.06)' }}
        />
        <div className="container-custom relative z-10 text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary opacity-60" />
              <span className="section-label">Writing</span>
              <div className="h-px w-12 bg-primary opacity-60" />
            </div>
            <h1 className="heading-xl mb-6">
              Technical{' '}
              <span className="text-gradient">Articles</span>
            </h1>
            <p className="text-text-muted text-xl max-w-2xl mx-auto leading-relaxed">
              Deep dives into production AI systems, open-source contributions, and the engineering
              decisions behind modern LLM applications.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats bar */}
      <AnimatedSection delay={0.2}>
        <div className="container-custom mb-14">
          <div
            className="rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ background: 'rgba(26,26,46,0.5)', border: '1px solid var(--card-border)' }}
          >
            {[
              { value: `${articles.length}`, label: 'Articles' },
              { value: `${allTags.length}`, label: 'Topics Covered' },
              { value: articles.reduce((sum, a) => sum + parseInt(a.readTime), 0) + '+', label: 'Minutes of Reading' },
              { value: '6', label: 'OSS Projects Covered' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-2xl text-gradient">{stat.value}</div>
                <div className="text-muted text-xs font-mono mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Articles grid */}
      <section className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <ArticleCard key={article.id} article={article} index={idx} />
          ))}
        </div>
      </section>
    </div>
  )
}
