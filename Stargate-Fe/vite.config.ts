import { defineConfig } from 'vite'
import path from "path";

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  server: {
      // host: 'localhost',
       port: 3000,
    },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ],
  },
})

export default viteConfig