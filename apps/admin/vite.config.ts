import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  plugins: [reactRefresh()],
  base: process.env.ADMIN_BASE_PATH,
});
