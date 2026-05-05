import Reveal from '@/components/Reveal';

interface Project {
  name: string;
  role: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: string;
  statusColor: 'green' | 'blue' | 'grey';
  featured?: boolean;
}

interface Template {
  name: string;
  description: string;
  stack: string[];
  githubUrl: string;
}

const templates: Template[] = [
  {
    name: 'react-tailwind-starter',
    description: 'Projet React + Tailwind initialisé avec système d\'authentification et gestion des messages.',
    stack: ['React', 'Tailwind', 'Auth'],
    githubUrl: 'https://github.com/AreAtomic/react-tailwind-starter',
  },
  {
    name: 'express-starter-kit',
    description: 'Starter Express + MongoDB avec services/response, sérialisation et structure prête à l\'emploi.',
    stack: ['Express', 'MongoDB', 'Node.js'],
    githubUrl: 'https://github.com/AreAtomic/express-starter-kit',
  },
  {
    name: 'slate-editor',
    description: 'Template Slate.js — éditeur de texte riche configurable et extensible.',
    stack: ['React', 'Slate.js'],
    githubUrl: 'https://github.com/AreAtomic/slate-editor',
  },
];

const projects: Project[] = [
  {
    name: 'TrainPreddict',
    role: 'Fondateur & CTO · 3 ans',
    description:
      "Application SaaS de création de plans d'entraînement sur mesure pour cyclistes. Moteur IA maison — analyse le profil, les objectifs et l'historique pour générer un programme adapté.",
    stack: ['Next.js', 'Node.js', 'Python', 'IA'],
    liveUrl: 'https://trainpreddict-app.vercel.app/',
    githubUrl: 'https://github.com/AreAtomic/trainpreddict_app',
    status: 'En ligne',
    statusColor: 'green',
    featured: true,
  },
  {
    name: 'ILEA Connect',
    role: 'CTO · 3 ans',
    description:
      "Plateforme de prise de RDV pour professionnels de la beauté à domicile. De zéro à la mise en production après une levée de 200k€. Pilotage de l'architecture, du recrutement tech et des livraisons.",
    stack: ['React', 'Node.js', 'MongoDB', 'Express'],
    status: 'Expérience fondatrice',
    statusColor: 'blue',
  },
  {
    name: 'Nid',
    role: 'Co-fondateur & Dev',
    description:
      'Studio d\'accompagnement pour les startups early stage. Produit phare : le Dossier de Fondation — 2 semaines pour poser les bases stratégiques, produit et techniques avant de développer.',
    stack: ['Next.js', 'TypeScript', 'Supabase'],
    liveUrl: 'https://nidstrategie.com',
    status: 'En ligne',
    statusColor: 'green',
  },
  {
    name: 'Omiz App',
    role: 'Hackaton - lead developer',
    description:
      "Agrégateur de lives français en temps réel — trouve tous les streamers actifs sur Twitch en un coup d'œil. Projet perso, construit en solo.",
    stack: ['React', 'Node.js', 'API REST'],
    githubUrl: 'https://github.com/AreAtomic/Omiz_App',
    status: 'Archivé',
    statusColor: 'grey',
  },
];

const statusStyles = {
  green: 'bg-[#E6F9F0] text-[#0A8C4A]',
  blue: 'bg-brand-blue-light text-brand-blue',
  grey: 'bg-[#F0F0F0] text-[#666]',
};

function ExternalLinkIcon() {
  return (
    <svg width='13' height='13' viewBox='0 0 13 13' fill='none'>
      <path
        d='M2 11L11 2M11 2H6M11 2V7'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.04c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z' />
    </svg>
  );
}

export default function Portfolio() {
  return (
    <section
      id='portfolio'
      className='py-24 px-6 md:px-10 bg-white border-t border-[#EBEBEB]'
    >
      <div className='max-w-[1080px] mx-auto'>
        <Reveal>
          <div className='text-[12px] font-bold tracking-[0.1em] uppercase text-brand-blue mb-3'>
            Portfolio
          </div>
          <h2 className='text-[clamp(28px,3.5vw,44px)] font-extrabold tracking-[-0.03em] text-brand-ink leading-[1.15] mb-4'>
            Ce que j&apos;ai construit
          </h2>
          <p className='text-[17px] text-brand-muted max-w-[480px] leading-[1.6] mb-14'>
            Projets personnels, missions et expériences fondatrices.
          </p>
        </Reveal>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {projects.map((project, i) => (
            <Reveal
              key={project.name}
              delay={Math.min(i + 1, 3) as 0 | 1 | 2 | 3}
            >
              <div
                className={`relative rounded-2xl p-8 h-full flex flex-col transition-all duration-200 hover:-translate-y-1 ${
                  project.featured
                    ? 'bg-brand-blue border border-brand-blue hover:shadow-[0_8px_40px_rgba(0,82,204,0.4)]'
                    : 'bg-white border border-[#E8E8E8] hover:border-brand-blue hover:shadow-[0_8px_32px_rgba(0,82,204,0.1)]'
                }`}
              >
                {/* Header */}
                <div className='flex items-start justify-between gap-4 mb-5'>
                  <div>
                    <div
                      className={`text-[11px] font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded mb-3 inline-block ${
                        project.featured
                          ? 'bg-white/20 text-white'
                          : statusStyles[project.statusColor]
                      }`}
                    >
                      {project.status}
                    </div>
                    <h3
                      className={`text-[20px] font-extrabold tracking-[-0.02em] ${
                        project.featured ? 'text-white' : 'text-brand-ink'
                      }`}
                    >
                      {project.name}
                    </h3>
                    <div
                      className={`text-[13px] mt-1 font-medium ${
                        project.featured ? 'text-white/70' : 'text-brand-muted'
                      }`}
                    >
                      {project.role}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p
                  className={`text-[15px] leading-[1.65] mb-6 flex-1 ${
                    project.featured ? 'text-white/80' : 'text-[#555]'
                  }`}
                >
                  {project.description}
                </p>

                {/* Stack */}
                <div className='flex flex-wrap gap-2 mb-6'>
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className={`text-[12px] font-medium px-2.5 py-1 rounded-full ${
                        project.featured
                          ? 'bg-white/15 text-white/90'
                          : 'bg-[#F5F5F5] border border-[#E5E5E5] text-[#444]'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                {(project.liveUrl || project.githubUrl) && (
                  <div className='flex gap-4'>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={`inline-flex items-center gap-1.5 text-[13px] font-semibold transition-opacity hover:opacity-70 ${
                          project.featured ? 'text-white' : 'text-brand-blue'
                        }`}
                      >
                        Voir le projet
                        <ExternalLinkIcon />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={`inline-flex items-center gap-1.5 text-[13px] font-semibold transition-opacity hover:opacity-70 ${
                          project.featured
                            ? 'text-white/80'
                            : 'text-brand-muted'
                        }`}
                      >
                        <GithubIcon />
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Templates open source */}
        <Reveal>
          <div className='mt-16 pt-12 border-t border-[#EBEBEB]'>
            <div className='text-[12px] font-bold tracking-[0.1em] uppercase text-brand-muted mb-6'>
              Templates open source
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {templates.map((tpl) => (
                <a
                  key={tpl.name}
                  href={tpl.githubUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex flex-col gap-3 bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl p-5 hover:border-brand-blue hover:bg-white transition-all duration-200'
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2 text-brand-muted group-hover:text-brand-blue transition-colors'>
                      <GithubIcon />
                    </div>
                    <ExternalLinkIcon />
                  </div>
                  <div className='text-[14px] font-bold text-brand-ink font-mono'>
                    {tpl.name}
                  </div>
                  <p className='text-[13px] text-brand-muted leading-[1.55] flex-1'>
                    {tpl.description}
                  </p>
                  <div className='flex flex-wrap gap-1.5'>
                    {tpl.stack.map((tech) => (
                      <span
                        key={tech}
                        className='text-[11px] font-medium px-2 py-0.5 bg-[#F0F0F0] rounded-full text-[#555]'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
