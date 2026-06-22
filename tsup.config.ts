import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    version: "src/core/version/index.ts",
  },
  format: ["esm", "cjs"],
  dts: {
    compilerOptions: {
      ignoreDeprecations: "6.0",
    },
  },
  clean: true,
  splitting: true,
  tsconfig: "tsconfig.src.json",
});
