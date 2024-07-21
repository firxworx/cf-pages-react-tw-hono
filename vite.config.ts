import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig, loadEnv, type UserConfig } from 'vite'
import pages from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import cloudflareAdapter from '@hono/vite-dev-server/cloudflare'
import tsconfigPaths from 'vite-tsconfig-paths'

import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import tailwindcssNesting from 'tailwindcss/nesting'
import cssDiscardComments from 'postcss-discard-comments'
import postCssOklabPolyfill from '@csstools/postcss-oklab-function'

// consider using `wrangler` to get the platform proxy
// import { getPlatformProxy } from 'wrangler'

// cloudflare build environment uses node 18 so `import.meta.dirname` is not available
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const commonConfig = {
  css: {
    postcss: {
      plugins: [
        tailwindcssNesting(),
        tailwindcss({ config: path.resolve(__dirname, 'tailwind.config.ts') }),
        postCssOklabPolyfill({ preserve: true }),
        autoprefixer(),
        cssDiscardComments({ removeAll: true }),
      ],
    },
  },
} satisfies UserConfig

/**
 * PostCSS + Tailwind are configured directly in this config so a `postcss.config.js` file is not required.
 *
 * @see https://vitejs.dev/config/build-options#build-rollupoptions
 * @see https://rollupjs.org/configuration-options/#input
 */
export default defineConfig(({ mode }) => {
  const _env = loadEnv(mode, process.cwd(), '')

  if (mode === 'client') {
    return {
      ...commonConfig,
      plugins: [tsconfigPaths()],
      build: {
        rollupOptions: {
          input: ['./src/client.tsx', './src/styles/style.css'],
          output: {
            dir: 'dist',
            entryFileNames: 'static/client.js',
            chunkFileNames: 'static/assets/[name]-[hash].js',
            assetFileNames: 'static/assets/[name].[ext]',
          },
        },
      },
    }
  }

  // server mode
  return {
    ...commonConfig,
    server: {
      watch: {
        ignored: [/\.wrangler/, /\.mf/],
      },
    },
    ssr: {
      external: ['react', 'react-dom'],
    },
    plugins: [
      tsconfigPaths(),
      pages({
        minify: true,
      }),
      devServer({
        adapter: cloudflareAdapter,
        entry: 'src/index.tsx',
      }),
    ],
    build: {
      rollupOptions: {
        input: './src/index.tsx',
      },
    },
  }
})
