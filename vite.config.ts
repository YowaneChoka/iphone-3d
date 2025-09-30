import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  const baseObj = {
    ghpages: '/iphone-3d/',
    development: './'
  }

  console.log(baseObj[mode]);
  
  return {
    plugins: [react(), sentryVitePlugin({
      org: "yowane-choka",
      project: "iphone-3d"
    })],

    base: baseObj[mode],
    build: {
      sourcemap: true
    }
  }
})