import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "yowane-choka",
    project: "iphone-3d"
  })],

  "base": "./",

  build: {
    sourcemap: true
  }
})