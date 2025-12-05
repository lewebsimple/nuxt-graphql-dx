import { createYoga } from "graphql-yoga";
import { defineEventHandler } from "h3";
// @ts-expect-error - resolved via alias at runtime
import { schema } from "#graphql/schema";

const yoga = createYoga({
  schema,
});

export default defineEventHandler(async (event) => {
  return yoga.handle(event.node.req, event.node.res);
});
