import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Aurélien Sèbe — Développeur Fullstack Freelance',
  description:
    'Développeur freelance fullstack — web, SaaS, intégration IA. Ancien CTO. Je cadre vos projets, construis vos produits, sans brûler votre budget.',
  openGraph: {
    title: 'Aurélien Sèbe — Développeur Fullstack Freelance',
    description:
      'Développeur freelance fullstack — web, SaaS, intégration IA. Ancien CTO. Je cadre vos projets, construis vos produits, sans brûler votre budget.',
    url: 'https://aureliensebe.com',
    siteName: 'Aurélien Sèbe',
    images: [
      {
        url: 'https://aureliensebe.com/og-image.png',
        width: 1200,
        height: 630,
        alt: "Je cadre d'abord, je code ensuite.",
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurélien Sèbe — Développeur Fullstack Freelance',
    description:
      'Développeur freelance fullstack — web, SaaS, intégration IA. Ancien CTO. Je cadre vos projets, construis vos produits, sans brûler votre budget.',
    images: ['https://aureliensebe.com/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <link rel="canonical" href={process.env.SITE_URL} />
      </head>
      <body className="font-sans text-brand-ink bg-white">
        <Nav />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
