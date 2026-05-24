import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";

const jsAsJsx = () => ({
  name: "js-as-jsx",
  async transform(code, id) {
    if (!id.match(/src\/.*\.js$/)) {
      return null;
    }

    return transformWithEsbuild(code, id, {
      loader: "jsx",
      jsx: "automatic",
    });
  },
});

export default defineConfig({
  plugins: [jsAsJsx(), react({ include: /\.(js|jsx)$/ })],
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.(js|jsx)$/,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
