import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    version: "src/core/version/index.ts",
    features: "src/core/features/index.ts",
    auth: "src/core/auth/index.ts",
    projects: "src/core/projects/index.ts",
    environments: "src/core/environments/index.ts",
    targets: "src/core/targets/index.ts",
    credentials: "src/core/credentials/index.ts",
  },
  format: ["esm", "cjs"],
  dts: {
    compilerOptions: {
      ignoreDeprecations: "6.0",
    },
  },
  cjsInterop: true,
  clean: true,
  splitting: false,
  tsconfig: "tsconfig.src.json",
  outExtension: ({ format }) => {
    return { js: format === "cjs" ? ".cjs" : ".js" };
  },
});
