import { defineNuxtModule, addPlugin, createResolver, addServerHandler, addTemplate } from "@nuxt/kit";

export interface GraphQLServerConfig {
  endpoint?: string;
}

export interface ModuleOptions {
  server?: GraphQLServerConfig | false;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-graphql-dx",
    configKey: "graphql",
  },
  defaults: {
    server: {
      endpoint: "/api/graphql",
    },
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    if (options.server) {
      const endpoint = options.server?.endpoint ?? "/api/graphql";
      nuxt.options.alias["#graphql/schema"] = resolver.resolve(
        nuxt.options.serverDir,
        "graphql/schema",
      );
      addTemplate({
        filename: "types/graphql.d.ts",
        src: resolver.resolve("./runtime/types/graphql-schema.d.ts"),
      });
      addServerHandler({
        route: endpoint,
        handler: resolver.resolve("./runtime/server/handler"),
      });
    }

    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
