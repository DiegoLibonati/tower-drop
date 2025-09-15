
import path from "path";

const isCodeSandbox =
  "SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env;

export default {
  root: "./",
  base: "./",
  publicDir: "./static/",
  server: {
    host: true,
    open: !isCodeSandbox,
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
