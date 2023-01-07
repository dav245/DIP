import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  envDir: "../",
  plugins: [vue()],
  server: {
    port: 5810,
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
