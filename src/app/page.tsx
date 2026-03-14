import type { Metadata } from 'next'
import { personalInfo } from '@/data/resume'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import FeaturedProjects from '@/components/FeaturedProjects'
import Contact from '@/components/Contact'

export const metadata: Metadata = {
  title: 'John Doe — Senior AI/ML Architect & Principal AI Scientist',
  description: personalInfo.bio,
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'John Doe',
  jobTitle: 'Senior AI/ML Architect & Principal AI Scientist',
  description: personalInfo.bio,
  url: 'https://johndoe.ai',
  email: 'john.doe@example.com',
  image: personalInfo.profileImage,
  sameAs: [
    'https://github.com/johndoe-ai',
    'https://linkedin.com/in/johndoe',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hyderabad',
    addressCountry: 'IN',
  },
  alumniOf: [
    { '@type': 'EducationalOrganization', name: 'IIT Hyderabad' },
    { '@type': 'EducationalOrganization', name: 'University of Hyderabad' },
  ],
  knowsAbout: [
    'Artificial Intelligence', 'Machine Learning', 'LLM Orchestration',
    'Agentic AI', 'RAG Architecture', 'PyTorch', 'LangChain', 'Python',
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <FeaturedProjects />
      <Contact />
    </>
  )
}
