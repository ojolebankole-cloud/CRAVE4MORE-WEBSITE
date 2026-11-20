import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Keep the original asset archive out of Vite's served/copied public directory.
  publicDir: "public-site",
  appType: "spa",
  build: {
    target: "es2022",
    sourcemap: false,
    // Rolldown's automatic splitting is used; route and 3D-stage imports are lazy.
  },
});
