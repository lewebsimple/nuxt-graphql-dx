# Nuxt GraphQL DX

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

This Nuxt module provides a great developer experience for doing amazing things with GraphQL.

- ✨ [Release Notes](/CHANGELOG.md)
- 🏀 [Online playground](https://stackblitz.com/github/lewebsimple/nuxt-graphql-dx?file=playground%2Fapp.vue)


## Features
- 🧘‍♂️ GraphQL Yoga server endpoint with user-provided schema


## Quick Setup

Install the module to your Nuxt application with one command:

```bash
pnpx nuxi module add nuxt-graphql-dx
```

Define your GraphQL schema in `server/graphql/schema.ts`:

```ts
import { createSchema } from "graphql-yoga";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
      type Query {
        hello: String!
      }
    `,
  resolvers: {
    Query: {
      hello: () => "Hello from Nuxt GraphQL DX Playground!",
    },
  },
});
```

That's it! Your GraphQL schema is now exposed in your Nuxt app ✨


## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  pnpm install
  
  # Generate type stubs
  pnpm run dev:prepare
  
  # Develop with the playground
  pnpm run dev
  
  # Build the playground
  pnpm run dev:build
  
  # Run ESLint
  pnpm run lint
  
  # Run Vitest
  pnpm run test
  pnpm run test:watch
  
  # Release new version
  pnpm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-graphql-dx/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-graphql-dx

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-graphql-dx.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-graphql-dx

[license-src]: https://img.shields.io/npm/l/nuxt-graphql-dx.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-graphql-dx

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
