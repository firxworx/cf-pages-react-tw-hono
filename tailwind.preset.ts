import type { Config } from 'tailwindcss'
import formsPlugin from '@tailwindcss/forms'
import containerQueriesPlugin from '@tailwindcss/container-queries'
import typographyPlugin from '@tailwindcss/typography'

/**
 * TailwindCSS preset representing the project's tailwind theme.
 * Includes the official tailwind forms and container queries plugin but not the typography plugin.
 *
 * @see tailwind.config.ts
 */
const tailwindPreset: Partial<Omit<Config, 'content'>> = {
  darkMode: 'class',
  theme: {
    extend: {
      // animation: { ... },
      // keyframes: { ... },

      // colors: { ... },
      // spacing: {},

      maxWidth: {
        prose: '65ch',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      padding: {
        '1/3': '33.33333%',
        '2/3': '66.66666%',
      },

      // customize the tailwind typography plugin's `prose` utilities added by the @tailwindcss/typography plugin
      // typography: (theme: PluginAPI['theme']) => { ... }
    },
  },
  plugins: [formsPlugin, containerQueriesPlugin, typographyPlugin],
} satisfies Partial<Omit<Config, 'content'>>

export default tailwindPreset
