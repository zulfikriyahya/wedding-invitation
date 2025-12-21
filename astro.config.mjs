import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwind()],
  },
});
