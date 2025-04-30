import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sass from "sass";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    //tsconfigPaths()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: process.env.NODE_ENV === "production" ? "/" : "/",
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass, // Ensure Dart Sass is used
        api: "modern", // Use modern API or 'modern-compiler'
      },
    },
  },
});
