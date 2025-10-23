import path from "path";

export default {
  root: "./",
  base: "./",
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@tests": path.resolve(__dirname, "./tests"),
    },
  },
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    sourcemap: true,
  },
};
