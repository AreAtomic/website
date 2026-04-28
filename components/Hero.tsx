import Link from 'next/link'

export default function Hero() {
  return (
    <section
      id="hero"
      className="pt-[120px] md:pt-40 pb-[72px] md:pb-[120px] px-6 md:px-10 bg-white"
    >
      <div className="max-w-[1080px] mx-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-brand-blue-light text-brand-blue text-[13px] font-semibold px-3.5 py-1.5 rounded-full mb-7 tracking-[0.02em]">
          <span className="w-1.5 h-1.5 bg-brand-blue rounded-full" />
          Développeur Freelance · France
        </div>

        {/* Title */}
        <h1 className="text-[clamp(40px,5vw,68px)] font-extrabold text-brand-ink leading-[1.08] tracking-[-0.03em] max-w-[800px] mb-6">
          Je pense d&apos;abord.
          <br />
          <em className="not-italic text-brand-blue">Je code ensuite.</em>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-brand-muted max-w-[520px] leading-[1.65] mb-11">
          Développeur fullstack et ancien CTO. Je cadre vos projets, construis vos produits, et
          intègre l&apos;IA pour aller plus loin — sans brûler votre budget.
        </p>

        {/* CTA buttons */}
        <div className="flex gap-4 flex-wrap items-center">
          <Link
            href="/contact"
            className="bg-brand-orange hover:bg-brand-orange-dark text-white px-7 py-3.5 rounded-[10px] font-bold text-[15px] transition-all hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(255,107,53,0.3)] hover:shadow-[0_8px_24px_rgba(255,107,53,0.35)]"
          >
            Parlons de votre projet
          </Link>
          <Link
            href="/#services"
            className="text-brand-blue font-semibold text-[15px] inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
          >
            Voir mes services
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="#0052CC"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex gap-8 md:gap-12 mt-[72px] pt-10 border-t border-[#E8E8E8] flex-wrap">
          <div>
            <div className="text-[36px] font-extrabold text-brand-ink tracking-[-0.04em] leading-none mb-1">
              3<span className="text-brand-blue">ans</span>
            </div>
            <div className="text-[13px] text-brand-muted font-medium">CTO d&apos;une startup</div>
          </div>
          <div>
            <div className="text-[36px] font-extrabold text-brand-ink tracking-[-0.04em] leading-none mb-1">
              200<span className="text-brand-blue">k€</span>
            </div>
            <div className="text-[13px] text-brand-muted font-medium">Levée de fonds pilotée</div>
          </div>
          <div>
            <div className="text-[36px] font-extrabold text-brand-ink tracking-[-0.04em] leading-none mb-1">
              Full<span className="text-brand-blue">stack</span>
            </div>
            <div className="text-[13px] text-brand-muted font-medium">Web · SaaS · IA</div>
          </div>
        </div>
      </div>
    </section>
  )
}
