import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0052CC',
          'blue-dark': '#003DA5',
          'blue-light': '#E8F0FF',
          orange: '#FF6B35',
          'orange-dark': '#E85A2B',
          ink: '#1A1A1A',
          muted: '#666666',
          surface: '#FAFAFA',
          navy: '#001F5C',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
