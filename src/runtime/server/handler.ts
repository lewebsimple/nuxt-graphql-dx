import { createSchema, createYoga } from "graphql-yoga";
import { defineEventHandler } from "h3";

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String!
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello from GraphQL Yoga!",
      },
    },
  }),
  fetchAPI: globalThis,
});

export default defineEventHandler(async (event) => {
  return yoga.handle(event.node.req, event.node.res);
});
