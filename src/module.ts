import { readFileSync } from "node:fs";
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
        filename: "types/graphql-schema.d.ts",
        src: resolver.resolve("./runtime/types/graphql-schema.d.ts"),
      });

      addTemplate({
        filename: "graphql/handler.ts",
        write: true,
        getContents: () => {
          const template = readFileSync(resolver.resolve("./runtime/server/handler.ts"), "utf-8");
          return template.replace("{{endpoint}}", endpoint);
        },
      });

      addServerHandler({
        route: endpoint,
        handler: "#build/graphql/handler.ts",
      });
    }

    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
