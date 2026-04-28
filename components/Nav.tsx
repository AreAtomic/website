import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/[0.92] backdrop-blur-xl border-b border-black/[0.06] px-5 md:px-10 h-16 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-9 h-9 bg-brand-blue rounded-lg flex items-center justify-center text-white font-extrabold text-sm tracking-tight select-none">
          AS
        </div>
        <span className="font-semibold text-[15px] text-brand-ink">Aurélien Sèbe</span>
      </Link>

      <ul className="hidden md:flex gap-8 list-none m-0 p-0">
        <li>
          <Link href="/#services" className="text-sm font-medium text-brand-muted hover:text-brand-blue transition-colors">
            Services
          </Link>
        </li>
        <li>
          <Link href="/#about" className="text-sm font-medium text-brand-muted hover:text-brand-blue transition-colors">
            À propos
          </Link>
        </li>
        <li>
          <Link href="/blog" className="text-sm font-medium text-brand-muted hover:text-brand-blue transition-colors">
            Blog
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-sm font-medium text-brand-muted hover:text-brand-blue transition-colors">
            Contact
          </Link>
        </li>
      </ul>

      <Link
        href="/contact"
        className="bg-brand-orange hover:bg-brand-orange-dark text-white px-5 py-[9px] rounded-lg font-semibold text-sm transition-all hover:-translate-y-px"
      >
        Parlons de votre projet
      </Link>
    </nav>
  )
}
