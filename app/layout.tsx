import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Aurélien Sèbe — Développeur Fullstack Freelance',
  description:
    'Développeur freelance fullstack — web, SaaS, intégration IA. Ancien CTO. Je cadre vos projets, construis vos produits, sans brûler votre budget.',
  icons: {
    icon: '/favicon.ico',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans text-brand-ink bg-white">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
