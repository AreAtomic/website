import type { Metadata } from 'next'
import Portfolio from '@/components/Portfolio'

export const metadata: Metadata = {
  title: 'Portfolio — Aurélien Sèbe',
  description:
    'Projets SaaS, templates open source et références : TrainPreddict, ILEA Connect, Nid, et plus.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio — Aurélien Sèbe',
    description:
      'Projets SaaS, templates open source et références : TrainPreddict, ILEA Connect, Nid, et plus.',
    url: '/portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio — Aurélien Sèbe',
    description:
      'Projets SaaS, templates open source et références : TrainPreddict, ILEA Connect, Nid, et plus.',
  },
}

export default function PortfolioPage() {
  return (
    <main>
      <Portfolio />
    </main>
  )
}
