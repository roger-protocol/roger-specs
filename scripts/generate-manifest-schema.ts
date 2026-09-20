import z from "zod";
import { ManifestSchema } from "@/core/manifest/schemas/manifest.schema.js";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

const distTarget = join(process.cwd(), "dist", "manifest-schema.json");
const docsTarget = join(process.cwd(), "apps", "roger-docs", "public", "manifest-schema.json");

async function buildManifestSchema() {
  const start = Date.now();
  console.log("[Manifest Schema]: Generating JSON Schema from ManifestSchema...");
  const jsonSchema = z.toJSONSchema(ManifestSchema, { target: "draft-7" });
  console.log(
    `[Manifest Schema]: Generated successfully in ${Math.round(Date.now() - start).toString()}ms.`,
  );

  console.log("[Manifest Schema]: Creating directories...");
  await Promise.all([
    mkdir(dirname(distTarget), { recursive: true }),
    mkdir(dirname(docsTarget), { recursive: true }),
  ]);

  console.log("[Manifest Schema]: Writing files...");
  await Promise.all([
    writeFile(distTarget, JSON.stringify(jsonSchema, null, 2), "utf-8").then(() => {
      console.log(
        `[Manifest Schema]: Successfully wrote manifest.schema.json in ${dirname(distTarget)}`,
      );
    }),
    writeFile(docsTarget, JSON.stringify(jsonSchema, null, 2), "utf-8").then(() => {
      console.log(
        `[Manifest Schema]: Successfully wrote manifest.schema.json in ${dirname(docsTarget)}`,
      );
    }),
  ]);
}

await buildManifestSchema();
