import Reveal from '@/components/Reveal';

function CheckIcon({ color = '#0052CC' }: { color?: string }) {
  return (
    <svg
      className='w-4 h-4 flex-shrink-0 mt-0.5'
      viewBox='0 0 16 16'
      fill='none'
    >
      <circle cx='8' cy='8' r='8' fill={color} fillOpacity='0.15' />
      <path
        d='M5 8l2 2 4-4'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default function Services() {
  return (
    <section
      id='services'
      className='py-24 px-6 md:px-10 bg-brand-surface border-t border-[#EBEBEB]'
    >
      <div className='max-w-[1080px] mx-auto'>
        <Reveal>
          <div className='text-[12px] font-bold tracking-[0.1em] uppercase text-brand-blue mb-3'>
            Services
          </div>
          <h2 className='text-[clamp(28px,3.5vw,44px)] font-extrabold tracking-[-0.03em] text-brand-ink leading-[1.15] mb-4'>
            Ce que je fais pour vous
          </h2>
          <p className='text-[17px] text-brand-muted max-w-[480px] leading-[1.6] mb-14'>
            Trois offres claires, sans surprise — de la réflexion à la
            livraison.
          </p>
        </Reveal>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Cadrage */}
          <Reveal delay={1}>
            <div className='bg-white border border-[#E8E8E8] rounded-2xl p-9 hover:border-brand-blue hover:shadow-[0_8px_32px_rgba(0,82,204,0.1)] hover:-translate-y-1 transition-all duration-200 h-full'>
              <div className='w-12 h-1 bg-brand-blue rounded-sm mb-6' />
              <div className='inline-block text-[11px] font-bold tracking-[0.08em] uppercase bg-brand-blue-light text-brand-blue px-2.5 py-1 rounded mb-5'>
                Avant de coder
              </div>
              <div className='text-[22px] font-extrabold tracking-[-0.02em] text-brand-ink mb-2'>
                Cadrage Produit
              </div>
              <div className='text-[28px] font-extrabold text-brand-blue tracking-[-0.03em] mb-4'>
                2 000 €
              </div>
              <p className='text-[15px] text-brand-muted leading-[1.65] mb-7'>
                Avant d&apos;écrire une ligne, on clarifie. Architecture, specs,
                risques — je vous donne la carte avant l&apos;expédition.
              </p>
              <ul className='space-y-0'>
                {[
                  'Analyse des besoins & objectifs',
                  'Architecture technique recommandée',
                  'Spécifications fonctionnelles',
                  'Chiffrage & roadmap réaliste',
                  'Livrables écrits, actionnables',
                ].map((item) => (
                  <li
                    key={item}
                    className='flex items-start gap-2.5 text-sm text-brand-ink py-1.5 border-b border-[#F0F0F0] last:border-0'
                  >
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Dev — featured */}
          <Reveal delay={2}>
            <div className='bg-brand-blue border border-brand-blue rounded-2xl p-9 hover:shadow-[0_8px_40px_rgba(0,82,204,0.4)] hover:-translate-y-1 transition-all duration-200 h-full'>
              <div className='w-12 h-1 bg-white/50 rounded-sm mb-6' />
              <div className='inline-block text-[11px] font-bold tracking-[0.08em] uppercase bg-white/20 text-white px-2.5 py-1 rounded mb-5'>
                Code
              </div>
              <div className='text-[22px] font-extrabold tracking-[-0.02em] text-white mb-2'>
                Développement Fullstack
              </div>
              <div className='text-[28px] font-extrabold text-white/90 tracking-[-0.03em] mb-4'>
                500 € / jour
              </div>
              <p className='text-[15px] text-white/75 leading-[1.65] mb-7'>
                Du back au front. Je code, je teste, je déploie. Code propre,
                scalable, maintenable par votre équipe après moi.
              </p>
              <ul className='space-y-0'>
                {[
                  'Web app, SaaS, API REST',
                  'Front React / Next.js',
                  'Back Node, Python, SQL/NoSQL',
                  'Déploiement & CI/CD',
                  'Documentation incluse',
                ].map((item) => (
                  <li
                    key={item}
                    className='flex items-start gap-2.5 text-sm text-white/90 py-1.5 border-b border-white/10 last:border-0'
                  >
                    <CheckIcon color='rgba(255,255,255,0.8)' />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* IA */}
          <Reveal delay={3}>
            <div className='bg-white border border-[#E8E8E8] rounded-2xl p-9 hover:border-brand-blue hover:shadow-[0_8px_32px_rgba(0,82,204,0.1)] hover:-translate-y-1 transition-all duration-200 h-full'>
              <div className='w-12 h-1 bg-brand-blue rounded-sm mb-6' />
              <div className='inline-block text-[11px] font-bold tracking-[0.08em] uppercase bg-brand-blue-light text-brand-blue px-2.5 py-1 rounded mb-5'>
                Intelligence artificielle
              </div>
              <div className='text-[22px] font-extrabold tracking-[-0.02em] text-brand-ink mb-2'>
                Intégration IA
              </div>
              <div className='text-[28px] font-extrabold text-brand-blue tracking-[-0.03em] mb-4'>
                <span className='text-[14px]'>À partir de</span> 900€/jour
              </div>
              <p className='text-[15px] text-brand-muted leading-[1.65] mb-7'>
                LLM, RAG, agents — intégrés proprement dans vos produits. Pas de
                la démo, du vrai.
              </p>
              <ul className='space-y-0'>
                {[
                  'Intégration / Anthropic',
                  'RAG & bases de connaissances',
                  'Agents & automatisations',
                  'Optimisation coût / performance',
                  'Audit IA de votre produit',
                ].map((item) => (
                  <li
                    key={item}
                    className='flex items-start gap-2.5 text-sm text-brand-ink py-1.5 border-b border-[#F0F0F0] last:border-0'
                  >
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
