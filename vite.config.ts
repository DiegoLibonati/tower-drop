import path from "path";
import { defineConfig } from "vite";

import type { UserConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "@tests": path.resolve(import.meta.dirname, "./__tests__"),
    },
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    open: false,
    watch: {
      usePolling: true,
    },
    strictPort: true,
  },
  preview: {
    port: 3001,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    minify: "esbuild",
    target: "ES2022",
  },
}) as UserConfig;
