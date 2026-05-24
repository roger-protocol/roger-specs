import "@/index.js"; // Load all schemas so they register their routes in the apiRegistry
import { apiRegistry } from "@/shared/openapi.js";
import packageJson from "../package.json" with { type: "json" };
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { writeFile } from "node:fs/promises";

async function buildOpenAPI() {
  const RELEASE_VERSION = packageJson.version;
  const majorVersion = `v${RELEASE_VERSION.split(".")[0]}`;

  const versionedRoutes = apiRegistry.definitions.map((def) => {
    if (def.type === "route") {
      const cleanPath = def.route.path.startsWith("/") ? def.route.path : `/${def.route.path}`; // Ensure route is in the format /route (billing/card -> /billing/card)
      return { ...def, route: { ...def.route, path: `/api/${majorVersion}${cleanPath}` } }; // Append /api/v# at the start of each route (/billing -> /api/v1/billing)
    } else {
      return def;
    }
  });

  const generator = new OpenApiGeneratorV3(versionedRoutes);
  const OpenAPIDocument = generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Roger Protocol Specification",
      version: RELEASE_VERSION,
    },
  }) satisfies object;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await writeFile(
    new URL("../openapi.json", import.meta.url),
    JSON.stringify(OpenAPIDocument, null, 2),
    "utf-8",
  );
}

await buildOpenAPI();
