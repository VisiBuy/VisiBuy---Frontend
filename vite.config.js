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
  define: {
    "process.env": {
      REACT_APP_BASE_URL: "https://visibuy-backend-dev.onrender.com/api/v1/",
    },
  },
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
