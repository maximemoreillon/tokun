# Tokun

This is an application to learn Japanese.
It allows the user to load Japanese text and identifies the words it contains.
The user can then go through each word and evaluate their understanding of it.

## How it works

- **Tokenization**: submitted texts are split into tokens on the server using [kuromoji.js](https://github.com/takuyaa/kuromoji.js). Each token has a surface form, a part of speech and a reading.
- **Vocabulary**: only nouns, verbs, interjections and adverbs that have a reading are treated as vocabulary (see `src/lib/config.ts`). Other tokens, such as particles, are displayed as plain text.
- **Tracking**: tokens belong to a user and are deduplicated by surface form, so marking a word as known, important or ignored applies to every text that contains it.
- **Reading**: in a text, unknown words are highlighted in red (bold if important). Known and ignored words can be highlighted too. Clicking a word shows its reading and lets the user update its status. A token list page offers search, filters and pagination.
- **Auth**: [Auth.js](https://authjs.dev/) (`@auth/sveltekit`) with Keycloak and/or Auth0, depending on which issuer variables are set. The user's email is used as their ID and every query is scoped to it.

## Tech stack

- [SvelteKit](https://svelte.dev/docs/kit) (Svelte 5) + TypeScript, built with `adapter-node`
- Tailwind CSS and daisyUI
- [kuromoji.js](https://github.com/takuyaa/kuromoji.js) for tokenization
- PostgreSQL, accessed with [Drizzle ORM](https://orm.drizzle.team/)

## Configuration

Environment variables:

| Variable                                                           | Purpose                                     |
| ------------------------------------------------------------------ | ------------------------------------------- |
| `DATABASE_URL`                                                     | PostgreSQL connection string                |
| `AUTH_KEYCLOAK_ID`, `AUTH_KEYCLOAK_SECRET`, `AUTH_KEYCLOAK_ISSUER` | Enables the Keycloak provider               |
| `AUTH_AUTH0_ISSUER`                                                | Enables the Auth0 provider (client credentials are read by Auth.js) |

## Developing

Install dependencies, set the environment variables above (for example in a `.env` file) and start a dev server:

```sh
npm install
npm run dev
```

The database schema is defined in `src/lib/server/db/schema.ts`. It can be pushed to the database with `npx drizzle-kit push`.

Build and run in production:

```sh
npm run build
node build/index.js
```

The kuromoji dictionary is loaded from `./node_modules/kuromoji/dict/`, so the app must be run from a directory where `node_modules` is installed.

## Deployment

A `Dockerfile` (Node 20) builds and serves the app on port 3000. `.gitlab-ci.yml` builds and pushes the image to Docker Hub on `master`, then applies `kubernetes_manifest.yml` (Deployment, Service, Ingress and an `ExternalSecret` reading settings from Vault).
