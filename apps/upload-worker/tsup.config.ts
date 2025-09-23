import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/**/*"],
  noExternal: [
    '@buildinpubliq/db',
    '@buildinpubliq/redis'
  ],
  sourcemap: true,
  ...options,
}));