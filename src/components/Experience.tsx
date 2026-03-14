'use client'

import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import { experience, education } from '@/data/resume'

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute right-0 top-1/3 w-80 h-80 rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'rgba(124,58,237,0.04)' }}
      />

      <div className="container-custom relative z-10">
        <AnimatedSection className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-12 bg-primary opacity-60" />
            <span className="section-label">Career journey</span>
          </div>
          <h2 className="heading-lg">
            25 years of{' '}
            <span className="text-gradient">building AI</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Experience timeline */}
          <div className="lg:col-span-2">
            <h3 className="font-display font-semibold text-text mb-8 flex items-center gap-2">
              <span className="text-primary">◈</span> Work Experience
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div
                className="absolute left-4 top-0 bottom-0 w-px"
                style={{ background: 'linear-gradient(to bottom, var(--primary), var(--accent), transparent)' }}
              />

              <div className="space-y-8">
                {experience.map((job, idx) => (
                  <AnimatedSection key={`${job.company}-${idx}`} delay={idx * 0.1}>
                    <div className="relative pl-12">
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-2 flex items-center justify-center">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center z-10"
                          style={{
                            background: idx === 0 ? 'rgba(0,212,255,0.15)' : 'rgba(124,58,237,0.1)',
                            border: `2px solid ${idx === 0 ? 'var(--primary)' : 'var(--accent)'}`,
                          }}
                        >
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ background: idx === 0 ? 'var(--primary)' : 'var(--accent)' }}
                          />
                        </div>
                      </div>

                      <div
                        className="card-base card-hover p-6"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div>
                            <h4 className="font-display font-bold text-text text-lg">{job.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-primary font-semibold text-sm">{job.company}</span>
                              <span className="text-muted">·</span>
                              <span className="text-text-muted text-sm">{job.location}</span>
                            </div>
                          </div>
                          <span
                            className="text-xs font-mono px-3 py-1 rounded-full whitespace-nowrap"
                            style={{
                              background: idx === 0 ? 'rgba(0,212,255,0.1)' : 'rgba(124,58,237,0.1)',
                              color: idx === 0 ? 'var(--primary)' : 'var(--accent-bright)',
                              border: `1px solid ${idx === 0 ? 'rgba(0,212,255,0.2)' : 'rgba(124,58,237,0.2)'}`,
                            }}
                          >
                            {job.period}
                          </span>
                        </div>

                        <ul className="space-y-2">
                          {job.highlights.map((h, hIdx) => (
                            <li
                              key={hIdx}
                              className="flex items-start gap-2 text-text-muted text-sm"
                            >
                              <span className="text-primary mt-1 shrink-0 text-xs">▸</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>

          {/* Education sidebar */}
          <div>
            <AnimatedSection direction="right">
              <h3 className="font-display font-semibold text-text mb-8 flex items-center gap-2">
                <span className="text-accent-bright">◈</span> Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="card-base p-5 group hover:border-accent/30 transition-all"
                    style={{ borderColor: 'var(--card-border)' }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-display font-semibold text-text text-sm leading-snug">{edu.degree}</h4>
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded whitespace-nowrap shrink-0"
                        style={{ background: 'rgba(124,58,237,0.1)', color: 'var(--accent-bright)' }}
                      >
                        {edu.year}
                      </span>
                    </div>
                    <p className="text-text-muted text-xs">{edu.institution}</p>
                    <p className="text-muted text-xs mt-0.5 font-mono">{edu.university}</p>
                  </motion.div>
                ))}
              </div>

              {/* Awards highlight */}
              <div
                className="mt-8 rounded-xl p-5"
                style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.12)' }}
              >
                <div className="section-label mb-4">Recognition</div>
                <div className="space-y-3">
                  {[
                    { icon: '🏆', text: 'TechVision Architect of the Year (2020 & 2022)' },
                    { icon: '🥇', text: 'Top LangChain OSS Contributor (2023)' },
                    { icon: '🎤', text: 'Speaker — PyCon India 2019, 2021, 2023' },
                    { icon: '📰', text: 'Analytics India "Top 25 AI Leaders" 2023' },
                  ].map((award) => (
                    <div key={award.text} className="flex items-start gap-2">
                      <span>{award.icon}</span>
                      <span className="text-text-muted text-xs leading-relaxed">{award.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
