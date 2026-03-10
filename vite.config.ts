import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react()];

  if (mode === "development") {
    try {
      // lovable-tagger is optional, only used in lovable.dev environment
      const { componentTagger } = require("lovable-tagger");
      plugins.push(componentTagger());
    } catch {
      // lovable-tagger not available, skip
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
