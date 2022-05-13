# Next Full Stack Boilerplate

This is a boilerplate Turborepo with multiple meta-frameworks all working in harmony and sharing packages based on the Turborepo kitchen sink starter repository.

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `api`: an [Express](https://expressjs.com/) server
- `storefront`: a [Next.js](https://nextjs.org) app
- `admin`: a [Vite](https://vitejs.dev/) single page app
- `logger`: isomorphic logger (a small wrapper around console.log)
- `ui`: a dummy React UI library (which contains a single `<CounterButton>` component)
- `graphql-codegen`: generated GraphQL code from api, storefront and admin package
- `scripts`: Jest and eslint configurations
- `tsconfig`: tsconfig.json;s used throughout the monorepo

Each package and app is 100% [Typescript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [Typescript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
- [commitlint](https://prettier.io) for linting commit messages
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) as GraphQL server
- [Apollo Client](https://www.apollographql.com/docs/react) as GraphQL React client
- [GraphQL Code Generator](https://www.graphql-code-generator.com/) to generate type-safe code from GraphQL schemas
