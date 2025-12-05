import { createSchema } from "graphql-yoga";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
      type Query {
        hello: String!
      }
      type Subscription {
        time: String!
      }
    `,
  resolvers: {
    Query: {
      hello: () => "Hello from Nuxt GraphQL DX Playground!",
    },
    Subscription: {
      time: {
        subscribe: async function* () {
          while (true) {
            yield { time: new Date().toISOString() };
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        },
      },
    },
  },
});
