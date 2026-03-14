import type { Metadata } from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://johndoe.ai'),
  title: {
    default: 'John Doe — Senior AI/ML Architect & Principal AI Scientist',
    template: '%s | John Doe',
  },
  description:
    'Senior AI/ML Architect with 25+ years of experience in LLM orchestration, agentic workflows, and distributed ML infrastructure. Open-source contributor to LangChain, LlamaIndex, and Hugging Face Transformers.',
  keywords: [
    'AI Architect', 'ML Engineer', 'LangChain', 'LlamaIndex', 'Agentic AI',
    'RAG', 'LLM', 'Machine Learning', 'Deep Learning', 'Python', 'PyTorch',
  ],
  authors: [{ name: 'John Doe' }],
  creator: 'John Doe',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://johndoe.ai',
    title: 'John Doe — Senior AI/ML Architect',
    description: '25+ years designing production-scale AI systems. Expert in LLM orchestration, agentic workflows, and open-source AI frameworks.',
    siteName: 'John Doe Portfolio',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'John Doe — AI/ML Architect',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'John Doe — Senior AI/ML Architect',
    description: '25+ years designing production-scale AI systems.',
    images: ['https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=630&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-text font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
