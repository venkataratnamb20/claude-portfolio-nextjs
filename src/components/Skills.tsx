'use client'

import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import { skillCategories } from '@/data/resume'

const levelColors = {
  expert: { bg: 'rgba(0,212,255,0.1)', border: 'rgba(0,212,255,0.25)', text: '#00d4ff', bar: '#00d4ff', width: '100%' },
  advanced: { bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.25)', text: '#9d5dff', bar: '#9d5dff', width: '80%' },
  proficient: { bg: 'rgba(0,212,255,0.06)', border: 'rgba(0,212,255,0.15)', text: '#64b3cc', bar: '#64b3cc', width: '65%' },
  intermediate: { bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.2)', text: '#94a3b8', bar: '#64748b', width: '50%' },
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(17,17,24,0.5) 50%, transparent 100%)' }}
      />
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(0,212,255,0.04)' }}
      />

      <div className="container-custom relative z-10">
        <AnimatedSection className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-12 bg-primary opacity-60" />
            <span className="section-label">Technical skills</span>
          </div>
          <h2 className="heading-lg">
            Tools of the{' '}
            <span className="text-gradient">trade</span>
          </h2>
          <p className="text-text-muted mt-4 max-w-xl">
            Across 25+ years, these are the technologies I&apos;ve mastered — from low-level systems
            to cutting-edge AI frameworks.
          </p>
        </AnimatedSection>

        <div className="space-y-10">
          {skillCategories.map((category, catIdx) => (
            <AnimatedSection key={category.category} delay={catIdx * 0.1}>
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="font-display font-semibold text-text text-lg">{category.category}</h3>
                <div className="flex-1 h-px" style={{ background: 'rgba(30,41,59,0.8)' }} />
              </div>

              {/* Skills grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {category.skills.map((skill, skillIdx) => {
                  const colors = levelColors[skill.level]
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIdx * 0.05 + skillIdx * 0.04, duration: 0.4 }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      className="rounded-xl p-4 group cursor-default transition-shadow"
                      style={{
                        background: colors.bg,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm font-medium" style={{ color: colors.text }}>
                          {skill.name}
                        </span>
                        {skill.years && (
                          <span
                            className="text-xs font-mono opacity-60"
                            style={{ color: colors.text }}
                          >
                            {skill.years}y
                          </span>
                        )}
                      </div>
                      <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: colors.bar }}
                          initial={{ width: 0 }}
                          whileInView={{ width: colors.width }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: catIdx * 0.05 + skillIdx * 0.04, ease: 'easeOut' }}
                        />
                      </div>
                      <div className="mt-1.5 text-xs capitalize" style={{ color: colors.text, opacity: 0.6 }}>
                        {skill.level}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
