import type { Config } from 'tailwindcss'
import tailwindPreset from './tailwind.preset'

/**
 * TailwindCSS configuration with theme customization and plugins loaded via a preset.
 */
const tailwindConfig = {
  darkMode: 'class',
  presets: [tailwindPreset],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {},
  plugins: [],
} satisfies Config

export default tailwindConfig
