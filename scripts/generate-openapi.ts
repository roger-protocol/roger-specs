import { apiRegistry } from "@/shared/openapi.js";
import { tagRegistry } from "@/shared/tags.js";
import packageJson from "../package.json" with { type: "json" };
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { mkdir } from "node:fs/promises";

const distTarget = join(process.cwd(), "dist", "openapi.json");
const docsTarget = join(process.cwd(), "apps", "roger-docs", "public", "openapi.json");

const ignoreVersioning = new Set(["/version"]);

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
      const apiPath = ignoreVersioning.has(cleanPath)
        ? `/_roger${cleanPath}`
        : `/_roger/${majorVersion + cleanPath}`;
      return { ...def, route: { ...def.route, path: apiPath } }; // Append /api/v# at the start of each route (/billing -> /api/v1/billing)
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

  OpenAPIDocument.tags = Array.from(tagRegistry, ([name, description]) => ({ name, description }));

  console.log("[OpenAPI]: Creating directories...");
  await Promise.all([
    mkdir(dirname(distTarget), { recursive: true }),
    mkdir(dirname(docsTarget), { recursive: true }),
  ]);

  console.log("[OpenAPI]: Writing files...");
  await Promise.all([
    writeFile(distTarget, JSON.stringify(OpenAPIDocument, null, 2), "utf-8").then(() => {
      console.log(`[OpenAPI]: Successfully wrote openapi.json in ${dirname(distTarget)}`);
    }),
    writeFile(docsTarget, JSON.stringify(OpenAPIDocument, null, 2), "utf-8").then(() => {
      console.log(`[OpenAPI]: Successfully wrote openapi.json in ${dirname(docsTarget)}`);
    }),
  ]);
}

await buildOpenAPI();
