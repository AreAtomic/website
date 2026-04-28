import Reveal from '@/components/Reveal';

const credentials = [
  {
    icon: (
      <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
        <rect
          x='3'
          y='4'
          width='14'
          height='12'
          rx='2'
          stroke='#0052CC'
          strokeWidth='1.5'
        />
        <path d='M3 8h14' stroke='#0052CC' strokeWidth='1.5' />
        <path
          d='M7 12h2M11 12h2'
          stroke='#0052CC'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
      </svg>
    ),
    title: 'CTO — ILEA CONNECT',
    sub: '3 ans · Startup · Levée 200k€ · Équipe tech de 2 alternants',
  },
  {
    icon: (
      <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
        <circle cx='10' cy='10' r='7' stroke='#0052CC' strokeWidth='1.5' />
        <path
          d='M10 6v4l2.5 2.5'
          stroke='#0052CC'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
      </svg>
    ),
    title: 'Freelance depuis 2019',
    sub: 'Auto-entrepreneur · Disponible · Basé en France',
  },
  {
    icon: (
      <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
        <path
          d='M4 14l4-4 3 3 5-6'
          stroke='#0052CC'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    title: "Produit d'abord",
    sub: 'Je cadre avant de coder. Toujours.',
  },
  {
    icon: (
      <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
        <path
          d='M6 4h8M6 8h8M6 12h4'
          stroke='#0052CC'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
      </svg>
    ),
    title: 'Web · SaaS · IA',
    sub: "De l'idée à la mise en production",
  },
];

const techStack = [
  'React',
  'Next.js',
  'Node.js',
  'Python',
  'TypeScript',
  'PostgreSQL',
  'OpenAI',
  'LangChain',
  'Docker',
  'Vercel',
  'Supabase',
  'REST API',
];

export default function About() {
  return (
    <section id='about' className='py-24 px-6 md:px-10 bg-white'>
      <div className='max-w-[1080px] mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start'>
          {/* Left column */}
          <div>
            <Reveal>
              <div className='text-[12px] font-bold tracking-[0.1em] uppercase text-brand-blue mb-3'>
                À propos
              </div>
              <h2 className='text-[clamp(28px,3.5vw,44px)] font-extrabold tracking-[-0.03em] text-brand-ink leading-[1.15] mb-6'>
                Développeur qui pense produit
              </h2>
            </Reveal>

            <Reveal className='space-y-5 text-[16px] text-[#444] leading-[1.75]'>
              <p>
                Je m&apos;appelle{' '}
                <strong className='text-brand-ink font-semibold'>
                  Aurélien Sèbe
                </strong>
                . Développeur fullstack freelance, basé en France. J&apos;ai
                passé 3 ans comme CTO d&apos;une startup de prise de rendez-vous
                avant de me mettre à mon compte.
              </p>
              <p>
                Ce qui me différencie : je comprends le produit avant de
                comprendre la technique. Je pose les bonnes questions,
                j&apos;identifie les risques, et je construis ce qui a du sens —
                pas ce qui fait briller en démo.
              </p>
              <p>
                Auto-entrepreneur, je travaille en direct avec les fondateurs et
                les équipes produit. Pas d&apos;agence, pas
                d&apos;intermédiaire.
              </p>
            </Reveal>

            {/* Story card */}
            <Reveal className='mt-10'>
              <div className='bg-[#F7F9FF] border border-[#DDEAFF] rounded-2xl p-8'>
                <div className='text-[11px] font-bold tracking-[0.1em] uppercase text-brand-blue mb-3'>
                  Expérience fondatrice
                </div>
                <div className='text-[17px] font-bold text-brand-ink mb-3'>
                  3 ans CTO — ILEA CONNECT
                </div>
                <p className='text-sm text-[#555] leading-[1.7]'>
                  J&apos;ai piloté toute la technique d&apos;une startup après
                  une levée de 200k€. On a brûlé du budget pour commercialiser
                  un POC trop tôt — avant que le produit soit stable. La startup
                  a été liquidée alors que je livrais le MVP.
                  <br />
                  <br />
                  <strong className='text-brand-blue'>
                    Ce que ça m&apos;a appris :
                  </strong>{' '}
                  aucun budget commercial ne rattrape un cadrage produit raté.
                  C&apos;est pourquoi le cadrage est mon offre phare.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right column */}
          <Reveal>
            <ul className='divide-y divide-[#F0F0F0]'>
              {credentials.map((c) => (
                <li
                  key={c.title}
                  className='flex gap-4 items-start py-5 first:pt-0'
                >
                  <div className='w-10 h-10 flex-shrink-0 bg-brand-blue-light rounded-[10px] flex items-center justify-center'>
                    {c.icon}
                  </div>
                  <div>
                    <div className='text-[15px] font-semibold text-brand-ink mb-0.5'>
                      {c.title}
                    </div>
                    <div className='text-[13px] text-brand-muted leading-[1.5]'>
                      {c.sub}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className='flex flex-wrap gap-2 mt-8'>
              {techStack.map((t) => (
                <span
                  key={t}
                  className='text-xs font-medium px-3 py-[5px] bg-[#F5F5F5] border border-[#E5E5E5] rounded-full text-[#444]'
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
