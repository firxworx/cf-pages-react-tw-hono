# cf-pages-react-tw-hono

Full-stack boilerplate with React + Hono that deploys to Cloudflare Pages.

Hono renders the HTML document of the React SPA and serves as back-end JSON API.

The project configuration is based on the example at [yusukebe/hono-spa-react](https://github.com/yusukebe/hono-spa-react) by [@yusukebe](https://github.com/yusukebe), the creator of Hono.

Be aware that this configuration will invoke the Cloudflare Worker for every GET request to non-API endpoints to serve the HTML document. This may not be ideal for all projects.

## Overview

Repo: https://github.com/firxworx/cf-pages-react-tw-hono
Example Deployment: https://cf-pages-react-tw-hono.pages.dev/

Original Reference: https://github.com/yusukebe/hono-spa-react
Similar Reference: https://github.com/yusukebe/hono-react-ssr

## Summary of Changes

- Additional configuration in `vite.config.ts`
- TailwindCSS and PostCSS added and configured via `vite.config.ts` with the TailwindCSS theme provided via a preset
- HMR (hot reloading) support in the client development environment for improved developer experience
- Support for TypeScript path aliases
- Biome for linting and formatting
- Restructured the project layout to provide a better scaffold for a small full-stack application

The simplified API omits global error handling, logging, CORS, and other features that are important considerations for production deployments. 

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

If you add a `public/` folder its contents will be copied to `dist/` as static files during the build.

The build generates `dist/_worker.js` which is run by Cloudflare Workers.

## Deployment

- Login to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and create a new Pages project
- Revise `name` in `wrangler.toml` to reflect your Cloudflare project name
- Revise `name` in `package.json` to reflect your git repo name 

If you connect your repository to Cloudflare Pages it will automatically build and deploy when you push to the main branch.

Otherwise if you are authenticated with Cloudflare Wrangler (CLI) you can build and deploy manually with:

```sh
pnpm build
pnpm wrangler pages deploy dist
```

## Cloudflare Notes

At the time of writing the Cloudflare Pages build environment runs pnpm 8.7.1 and uses Node 18+.

Node 20+ features such as support for loading environment files and using `import.meta.dirname` are not available.
