import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="px-6 md:px-10 py-6 md:py-8 bg-brand-navy flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-brand-blue rounded-sm flex items-center justify-center text-white text-[11px] font-extrabold select-none">
          AS
        </div>
        <span className="text-sm text-white/60">Aurélien Sèbe © 2026</span>
      </div>

      <div className="flex gap-6">
        <Link href="/#services" className="text-[13px] text-white/40 hover:text-white/80 transition-colors">
          Services
        </Link>
        <Link href="/#about" className="text-[13px] text-white/40 hover:text-white/80 transition-colors">
          À propos
        </Link>
        <a
          href="https://www.linkedin.com/in/aur%C3%A9lien-s%C3%A8be-98256b176/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-white/40 hover:text-white/80 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://www.malt.fr/profile/aureliensebe1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-white/40 hover:text-white/80 transition-colors"
        >
          Malt
        </a>
      </div>
    </footer>
  )
}
