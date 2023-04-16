import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

export default defineConfig({
  envDir: "../",
  plugins: [svelte()],
  optimizeDeps: { exclude: ["svelte-router-spa"] },
  server: {
    port: 5830,
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
