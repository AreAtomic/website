import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Contact — Aurélien Sèbe',
  description: 'Parlons de votre projet — cadrage, développement ou intégration IA.',
}

export default function ContactPage() {
  return (
    <main className="pt-16 min-h-screen bg-brand-blue-dark text-white">
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-start">
            {/* Left — info */}
            <div>
              <div className="text-[12px] font-bold tracking-[0.1em] uppercase text-white/50 mb-3">
                Contact
              </div>
              <h1 className="text-[clamp(32px,4vw,52px)] font-extrabold tracking-[-0.03em] text-white leading-[1.1] mb-4">
                On en parle ?
              </h1>
              <p className="text-[17px] text-white/60 max-w-[400px] leading-[1.6] mb-12">
                Un projet à cadrer, une feature à développer, une intégration IA — décrivez-moi
                votre situation.
              </p>

              <div className="space-y-7">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 flex-shrink-0 bg-white/10 rounded-[10px] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect
                        x="2"
                        y="4"
                        width="14"
                        height="10"
                        rx="2"
                        stroke="rgba(255,255,255,0.7)"
                        strokeWidth="1.4"
                      />
                      <path d="M2 7l7 4 7-4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[13px] text-white/50 mb-0.5">Email</div>
                    <a
                      href="mailto:aureliensebe@gmail.com"
                      className="text-[15px] font-medium text-white hover:text-brand-orange transition-colors"
                    >
                      aureliensebe@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 flex-shrink-0 bg-white/10 rounded-[10px] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect
                        x="2"
                        y="2"
                        width="14"
                        height="14"
                        rx="3"
                        stroke="rgba(255,255,255,0.7)"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M6 9h6M9 6v6"
                        stroke="rgba(255,255,255,0.7)"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[13px] text-white/50 mb-0.5">LinkedIn</div>
                    <a
                      href="https://www.linkedin.com/in/aur%C3%A9lien-s%C3%A8be-98256b176/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] font-medium text-white hover:text-brand-orange transition-colors"
                    >
                      linkedin.com/in/aureliensebe
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 flex-shrink-0 bg-white/10 rounded-[10px] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle
                        cx="9"
                        cy="7"
                        r="3"
                        stroke="rgba(255,255,255,0.7)"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6"
                        stroke="rgba(255,255,255,0.7)"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[13px] text-white/50 mb-0.5">Disponibilité</div>
                    <span className="text-[15px] font-medium text-white">
                      Disponible dès maintenant
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  )
}
