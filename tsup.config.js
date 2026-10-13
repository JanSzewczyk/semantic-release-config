import { defineConfig } from "tsup";

export default defineConfig([
  {
    clean: true,
    entry: ["./src/**/*.js"],
    format: ["esm", "cjs"],
    minify: true,
    outDir: "dist",
    splitting: true,
    treeshake: true
  }
]);
