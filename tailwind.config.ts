import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        base: { 
          50: '#F9FAFB',
          100: '#F3F4F6',
          150: '#EEEFF2',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#12161D',
          900: '#0B0F14'
        },
        accent: {
          500: '#9EC5FF', // subtle iridescent vibe
          600: '#7FB2FF',
          700: '#BDA8FF',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(125, 153, 255, 0.18)',
        'glow-light': '0 0 30px rgba(59, 130, 246, 0.15)',
      },
      backgroundImage: {
        grid:
          'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),' +
          'linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
      },
      typography: ({ theme }: any) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.white/80'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.white'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-quotes': theme('colors.white'),
            '--tw-prose-code': theme('colors.white'),
            a: { textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.12)' },
            'a:hover': { color: theme('colors.accent.600'), borderBottomColor: theme('colors.accent.600') },
            h2: { marginTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem' },
            'ul>li': { marginTop: '.5rem', marginBottom: '.5rem' },
            hr: { borderColor: 'rgba(255,255,255,0.08)' },
          },
        },
      }),
    },
  },
  plugins: [typography],
} satisfies Config