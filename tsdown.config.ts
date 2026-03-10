import { defineConfig } from "tsdown";

export default defineConfig({
  target: "es2022",
  format: ["esm"],
  sourcemap: true,
  clean: true,
  dts: true,
  entry: ["index.ts"],
});
