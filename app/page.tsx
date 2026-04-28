import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import ContactSection from '@/components/ContactSection'
import BlogSection from '@/components/BlogSection'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <ContactSection />
      <BlogSection />
    </main>
  )
}
