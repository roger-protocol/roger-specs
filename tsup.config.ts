import { defineConfig } from "tsup";
import { tsconfigPathsPlugin } from "esbuild-plugin-tsconfig-paths";

export default defineConfig({
  entry: {
    core: "src/core/index.ts",
  },
  format: ["esm", "cjs"],
  dts: {
    compilerOptions: {
      ignoreDeprecations: "6.0",
    },
  },
  clean: true,
  splitting: true,
  esbuildPlugins: [tsconfigPathsPlugin()],
});
