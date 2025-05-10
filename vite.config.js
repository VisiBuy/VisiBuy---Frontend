import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sass from "sass";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), tsconfigPaths()],
    optimizeDeps: {
      include: ["lucide-react"]
    },    
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base: mode === "production" ? "/" : "/",
    css: {
      preprocessorOptions: {
        scss: {
          implementation: sass,
          api: "modern",
        },
      },
    },
  };
});
