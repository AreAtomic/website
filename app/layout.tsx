import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getSiteUrl } from '@/lib/site'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  adjustFontFallback: true,
})

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Aurélien Sèbe — Développeur Fullstack Freelance',
  description:
    'Développeur freelance fullstack — web, SaaS, intégration IA. Ancien CTO. Je cadre vos projets, construis vos produits, sans brûler votre budget.',
  openGraph: {
    title: 'Aurélien Sèbe — Développeur Fullstack Freelance',
    description:
      'Développeur freelance fullstack — web, SaaS, intégration IA. Ancien CTO. Je cadre vos projets, construis vos produits, sans brûler votre budget.',
    url: '/',
    siteName: 'Aurélien Sèbe',
    locale: 'fr_FR',
    images: [
      {
        url: '/og-image.png',
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
    images: ['/og-image.png'],
  },
}

const GA_MEASUREMENT_ID = 'G-T3HMHV2123'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans text-brand-ink bg-white">
        <Nav />
        {children}
        <Footer />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
