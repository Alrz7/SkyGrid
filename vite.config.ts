import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
  plugins: [svgr(), react()],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
          clientPort: 1421,
        }
      : true,
    watch: {
      ignored: ["**/src-tauri/**"],
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      "@": "/src",
      "@assets": "/src/assets",
      "@pages": "/src/components/pages",
      "@charts": "/src/components/charts",
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
