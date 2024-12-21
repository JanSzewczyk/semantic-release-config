import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["./src/**/*.js"],
    outDir: "dist",
    minify: true,
    clean: true,
    format: ["esm", "cjs"],
    treeshake: true,
    splitting: true
  }
]);
