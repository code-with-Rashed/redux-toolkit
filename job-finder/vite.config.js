import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcass from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcass()],
  server: {
    watch: {
      ignored: ["**/db.json"],
    },
  },
});
