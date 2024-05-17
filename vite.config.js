import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "src"),
    },
    extensions: ["*", ".js", ".vue", ".json", ".ts"],
  },
});
