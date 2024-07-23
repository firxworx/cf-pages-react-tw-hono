# cf-pages-react-tw-hono

Full-stack boilerplate with React and Hono that deploys to Cloudflare Pages.

Hono renders the HTML document of the React SPA and serves the back-end JSON API.

The project configuration is based on the example [yusukebe/hono-spa-react](https://github.com/yusukebe/hono-spa-react) by [@yusukebe](https://github.com/yusukebe), creator of Hono.

Be aware this configuration invokes the Cloudflare Worker for every GET request to any endpoints not handled by `/api` to serve the HTML document. This may not be ideal for all projects.

## Overview

Repo: https://github.com/firxworx/cf-pages-react-tw-hono

Example Deployment: https://cf-pages-react-tw-hono.pages.dev/ (_this may be taken offline in future_)

References:

- Primary Reference: https://github.com/yusukebe/hono-spa-react
- Similar Reference: https://github.com/yusukebe/hono-react-ssr

## Summary of Changes

- Revised `vite.config.ts` for more nuanced configuration and added comments
- Revised `vite.config.ts` for TailwindCSS + PostCSS (no separate PostCSS config file is required)
- Added TailwindCSS config with theme and plugins added via a [preset](https://tailwindcss.com/docs/presets)
- Added HMR (hot reloading) for client development to improve the developer experience
- Added support for TypeScript path aliases: `@/*` maps to `src/*`
- Added [Biome](https://biomejs.dev/) for performant linting and formatting
- Added `.vscode/` configuration for VSCode users
- Revised the project layout to provide a better scaffold for a small full-stack application

The example API omits global error handling, logging, CORS, and other features that are important considerations for production deployments. 

## Development & Build

Clone the repository then install dependencies with `pnpm install`.

Start the dev server:

```sh
pnpm dev
```

The dev server runs on http://localhost:5173/ by default.

To build the project and output to `dist/`:

```sh
pnpm build
```

Refer to `vite.config.ts` for build configuration.

The `./src/document/DocumentLayout` component serves as a template for the HTML document. Any paths to project files must reflect the output paths per `vite.config.ts`.

If you add a `public/` folder then its contents will be copied to `dist/` as static files during the build. This can be useful for favicons, robots.txt, images, fonts, and other static assets.

The build generates:

- `dist/_worker.js` for execution by Cloudflare Workers
- `dist/_routes.json` to exclude requests for static files from invoking a Worker
- `dist/static/client.js` for the client-side bundle (React app)
- `dist/static/assets/*` with any build assets including the CSS file compiled by PostCSS

## Deployment

This project is optimized for deployment to Cloudflare Pages which has a free tier.

- Login to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and create a new Pages project
- Revise `name` in `wrangler.toml` to reflect your Cloudflare project name
- Revise `name` in `package.json` to reflect your git repo name 

If you connect your repository to Cloudflare Pages it will automatically build and deploy when you push to the main branch.

Otherwise if you authenticate the Cloudflare Wrangler (CLI) you can build and deploy manually with:

```sh
pnpm build
pnpm wrangler pages deploy dist
```

Docs for Wrangler: https://developers.cloudflare.com/workers/wrangler/

## Cloudflare Notes

At the time of writing the Cloudflare Pages build environment runs pnpm 8.7.1 and uses Node 18+.

Node 20+ features such as support for loading environment files and using `import.meta.dirname` are not available.
