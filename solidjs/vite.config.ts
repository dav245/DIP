import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";

export default defineConfig({
  envDir: "../",
  plugins: [solidPlugin()],
  server: {
    port: 5820,
  },
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "@common": path.resolve(__dirname, "../common"),
      "@c": path.resolve(__dirname, "./src/components"),
      "@p": path.resolve(__dirname, "./src/pages"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
