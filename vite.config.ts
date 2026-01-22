import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5173,
    middlewareMode: false,

    proxy: {
      "/phimapi": {
        target: "https://phimapi.com",
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/phimapi/, ""),
      },
    },
  },

  plugins: [
    {
      name: "serve-html-files",
      configureServer(server) {
        return () => {
          server.middlewares.use((req, res, next) => {
            if (!req.url) return next();

            const match = req.url.match(/^\/xem-phim\/([^/?]+)\/([^/?]+)(\/)?(\?.*)?$/);
            if (match && !req.url.endsWith(".html")) {
              const type = match[1];
              const movie = match[2];
              const htmlPath = path.join(__dirname, `public/xem-phim/${type}/${movie}.html`);

              if (fs.existsSync(htmlPath)) {
                const html = fs.readFileSync(htmlPath, "utf-8");
                res.setHeader("Content-Type", "text/html");
                res.end(html);
                return;
              }
            }
            next();
          });
        };
      },
    },
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
