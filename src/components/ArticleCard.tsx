'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Article } from '@/data/articles'

interface ArticleCardProps {
  article: Article
  index?: number
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="card-base group flex flex-col overflow-hidden"
    >
      {/* Cover image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(26,26,46,0.9) 100%)' }}
        />
        {/* Project badge */}
        <div className="absolute bottom-3 left-4">
          <span className="tech-tag">{article.projectTitle}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-muted text-xs font-mono">{formatDate(article.date)}</span>
          <span className="text-border">·</span>
          <span className="text-muted text-xs font-mono">{article.readTime}</span>
        </div>

        <h3 className="font-display font-bold text-text text-lg leading-snug mb-3 group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        <p className="text-text-muted text-sm leading-relaxed mb-4 flex-1">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tech-tag">{tag}</span>
          ))}
        </div>

        <Link
          href={`/articles/${article.slug}`}
          className="flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all duration-200 mt-auto pt-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          Read Article
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </motion.article>
  )
}
