import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@c": path.resolve(__dirname, "./src/components"),
      "@p": path.resolve(__dirname, "./src/pages"),
    },
  },
});
