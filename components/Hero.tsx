import Link from 'next/link';
import Image from 'next/image';
import portrait from '@/app/assets/portrait.jpg';

export default function Hero() {
  return (
    <section
      id='hero'
      className='pt-[120px] md:pt-40 pb-[72px] md:pb-[120px] px-6 md:px-10 bg-white'
    >
      <div className='max-w-[1080px] mx-auto'>
        <div className='flex flex-col md:flex-row gap-12 md:gap-16 items-start md:items-center'>
          {/* Content */}
          <div className='flex-1'>
            {/* Eyebrow */}
            <div className='inline-flex items-center gap-2 bg-brand-blue-light text-brand-blue text-[13px] font-semibold px-3.5 py-1.5 rounded-full mb-7 tracking-[0.02em]'>
              <span className='w-1.5 h-1.5 bg-brand-blue rounded-full' />
              Développeur Freelance · ex CTO · France
            </div>

            {/* Title */}
            <h1 className='text-[clamp(40px,5vw,68px)] font-extrabold text-brand-ink leading-[1.08] tracking-[-0.03em] mb-6'>
              <span className='block whitespace-nowrap'>
                Je cadre d&apos;abord.
              </span>
              <em className='not-italic text-brand-blue block whitespace-nowrap'>
                Je code ensuite.
              </em>
            </h1>

            {/* Subtitle */}
            <p className='text-lg text-brand-muted max-w-[520px] leading-[1.65] mb-11'>
              Développeur fullstack et ex CTO. Je cadre vos projets, construis
              vos produits, et intègre l&apos;IA pour aller plus loin sans
              brûler votre budget.
            </p>

            {/* CTA buttons */}
            <div className='flex gap-4 flex-wrap items-center'>
              <Link
                href='/contact'
                className='bg-brand-orange hover:bg-brand-orange-dark text-white px-7 py-3.5 rounded-[10px] font-bold text-[15px] transition-all hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(255,107,53,0.3)] hover:shadow-[0_8px_24px_rgba(255,107,53,0.35)]'
              >
                Parlons de votre projet
              </Link>
              <Link
                href='/#services'
                className='text-brand-blue font-semibold text-[15px] inline-flex items-center gap-1.5 hover:gap-2.5 transition-all'
              >
                Voir mes services
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                  <path
                    d='M3 8h10M9 4l4 4-4 4'
                    stroke='#0052CC'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Portrait */}
          <div className='flex-1 flex justify-center md:justify-end'>
            <Image
              src={portrait}
              alt='Aurélien Sèbe'
              className='rounded-[20px] object-cover w-full max-w-[250px] md:max-w-[380px] md:mx-0 h-auto'
              priority
            />
          </div>
        </div>

        {/* Stats */}
        <div className='flex gap-8 md:gap-12 mt-[72px] pt-10 border-t border-[#E8E8E8] flex-wrap items-center'>
          <div>
            <div className='text-[36px] font-extrabold text-brand-ink tracking-[-0.04em] leading-none mb-1'>
              3<span className='text-brand-blue'>ans</span>
            </div>
            <div className='text-[13px] text-brand-muted font-medium'>
              CTO d&apos;une startup
            </div>
          </div>
          <div>
            <div className='text-[36px] font-extrabold text-brand-ink tracking-[-0.04em] leading-none mb-1'>
              200<span className='text-brand-blue'>k€</span>
            </div>
            <div className='text-[13px] text-brand-muted font-medium'>
              Levée de fonds pilotée
            </div>
          </div>
          <div>
            <div className='text-[36px] font-extrabold text-brand-ink tracking-[-0.04em] leading-none mb-1'>
              Full<span className='text-brand-blue'>stack</span>
            </div>
            <div className='text-[13px] text-brand-muted font-medium'>
              Web · SaaS · IA
            </div>
          </div>
          <div className='w-full md:w-auto md:ml-auto flex gap-3 flex-wrap'>
            <button className='bg-brand-blue-dark hover:bg-brand-blue text-white px-5 py-[9px] rounded-lg font-semibold text-sm transition-all hover:-translate-y-px'>
              <a
                href='https://www.linkedin.com/in/aureliensebe/'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  aria-hidden='false'
                  data-supported-dps='34x34'
                  viewBox='0 0 34 34'
                  data-token-id='417'
                  role='img'
                  aria-label='LinkedIn'
                >
                  <path
                    fill='#0a66c2'
                    d='M34 2.5v29a2.5 2.5 0 0 1-2.5 2.5h-29A2.5 2.5 0 0 1 0 31.5v-29A2.5 2.5 0 0 1 2.5 0h29A2.5 2.5 0 0 1 34 2.5M10 13H5v16h5zm.45-5.5a2.88 2.88 0 0 0-2.86-2.9H7.5a2.9 2.9 0 0 0 0 5.8 2.88 2.88 0 0 0 2.95-2.81zM29 19.28c0-4.81-3.06-6.68-6.1-6.68a5.7 5.7 0 0 0-5.06 2.58h-.14V13H13v16h5v-8.51a3.32 3.32 0 0 1 3-3.58h.19c1.59 0 2.77 1 2.77 3.52V29h5z'
                  ></path>
                  <path
                    fill='#fff'
                    d='M34 2.5v29a2.5 2.5 0 0 1-2.5 2.5h-29A2.5 2.5 0 0 1 0 31.5v-29A2.5 2.5 0 0 1 2.5 0h29A2.5 2.5 0 0 1 34 2.5M10 13H5v16h5zm.45-5.5a2.88 2.88 0 0 0-2.86-2.9H7.5a2.9 2.9 0 0 0 0 5.8 2.88 2.88 0 0 0 2.95-2.81zM29 19.28c0-4.81-3.06-6.68-6.1-6.68a5.7 5.7 0 0 0-5.06 2.58h-.14V13H13v16h5v-8.51a3.32 3.32 0 0 1 3-3.58h.19c1.59 0 2.77 1 2.77 3.52V29h5z'
                  ></path>
                </svg>
                LinkedIn
              </a>
            </button>
            <button className='bg-black hover:bg-gray-800 text-white px-5 py-[9px] rounded-lg font-semibold text-sm transition-all hover:-translate-y-px'>
              <a
                href='https://github.com/AreAtomic'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2'
              >
                <svg
                  aria-hidden='true'
                  focusable='false'
                  viewBox='0 0 24 24'
                  width='20'
                  height='20'
                  fill='currentColor'
                  display='inline-block'
                  overflow='visible'
                >
                  <path d='M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943'></path>
                </svg>
                Github
              </a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
