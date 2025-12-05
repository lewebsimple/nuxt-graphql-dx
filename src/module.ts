import { defineNuxtModule, addPlugin, createResolver, addServerHandler } from "@nuxt/kit";

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
  setup(options, _nuxt) {
    const resolver = createResolver(import.meta.url);

    if (options.server === false) {
      return;
    }
    else {
      const endpoint = options.server?.endpoint ?? "/api/graphql";
      addServerHandler({
        route: endpoint,
        handler: resolver.resolve("./runtime/server/handler"),
      });
    }

    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
