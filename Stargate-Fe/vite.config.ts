import { defineConfig } from 'vite'

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  server: {
      host: 'localhost',
      port: 3000,
    },
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
    ],
  },
})

export default viteConfig
