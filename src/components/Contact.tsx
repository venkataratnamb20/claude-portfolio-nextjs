'use client'

import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/johndoe-ai',
    description: 'Open source contributions',
    color: '#e2e8f0',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/johndoe',
    description: 'Professional network',
    color: '#0a66c2',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:john.doe@example.com',
    description: 'john.doe@example.com',
    color: '#00d4ff',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Decorative line */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.2), transparent)' }}
      />
      <div
        className="absolute inset-0 grid-pattern opacity-30"
      />
      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'rgba(0,212,255,0.06)' }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary opacity-60" />
              <span className="section-label">Get in touch</span>
              <div className="h-px w-12 bg-primary opacity-60" />
            </div>
            <h2 className="heading-lg mb-4">
              Let&apos;s build something{' '}
              <span className="text-gradient">remarkable</span>
            </h2>
            <p className="text-text-muted text-lg leading-relaxed mb-12">
              Whether you&apos;re looking to architect an AI system, discuss open-source collaboration,
              or explore consulting opportunities — I&apos;d love to hear from you.
            </p>
          </AnimatedSection>

          {/* Social links */}
          <AnimatedSection delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {socialLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="card-base card-hover flex items-center gap-4 p-5 flex-1 max-w-xs mx-auto sm:mx-0"
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.2 }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${link.color}15`, color: link.color }}
                  >
                    {link.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-display font-semibold text-text">{link.name}</div>
                    <div className="text-text-muted text-xs mt-0.5">{link.description}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </AnimatedSection>

          {/* Availability badge */}
          <AnimatedSection delay={0.3}>
            <div
              className="inline-flex items-center gap-3 rounded-full px-6 py-3"
              style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-sm font-mono">
                Available for consulting & contract work
              </span>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
