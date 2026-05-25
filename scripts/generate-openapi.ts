import { apiRegistry } from "@/shared/openapi.js";
import packageJson from "../package.json" with { type: "json" };
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { writeFile } from "node:fs/promises";

async function buildOpenAPI() {
  const RELEASE_VERSION = packageJson.version;
  const majorVersion = `v${RELEASE_VERSION.split(".")[0]}`;

  const start = Date.now();
  console.log("[OpenAPI]: Registering schemas...");
  await import("@/index.js"); // Load all schemas so they register their routes in the apiRegistry
  console.log(
    `[OpenAPI]: Schemas registered suceessfully in ${Math.round(Date.now() - start).toString()}ms.`,
  );

  console.log(
    `[OpenAPI]: Versioning routes under /api/${majorVersion}... (version ${RELEASE_VERSION})`,
  );
  const versionedRoutes = apiRegistry.definitions.map((def) => {
    if (def.type === "route") {
      const cleanPath = def.route.path.startsWith("/") ? def.route.path : `/${def.route.path}`; // Ensure route is in the format /route (billing/card -> /billing/card)
      return { ...def, route: { ...def.route, path: `/api/${majorVersion}${cleanPath}` } }; // Append /api/v# at the start of each route (/billing -> /api/v1/billing)
    } else {
      return def;
    }
  });

  console.log(`[OpenAPI]: Generating openapi.json...`);
  const generator = new OpenApiGeneratorV3(versionedRoutes);
  const OpenAPIDocument = generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Roger Protocol Specification",
      version: RELEASE_VERSION,
    },
  }) satisfies object;

  await writeFile(
    new URL("../dist/openapi.json", import.meta.url),
    JSON.stringify(OpenAPIDocument, null, 2),
    "utf-8",
  );
  console.log(`[OpenAPI]: Successfully generated openapi.json under /dist/openapi.json.`);
}

await buildOpenAPI();
