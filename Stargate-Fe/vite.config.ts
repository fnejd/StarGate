import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  server: {
    // host: 'localhost',
    port: 3000,
    // 프록시 추가
    proxy: {
      '/rtc': {
        target: 'https://www.stargate-a406.kro.kr/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        // ws: true, // 찾아보니 websocket할 때 필요한 부분이라고 함
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  esbuild: {
    
  },
  plugins: [react()]
});

export default viteConfig;
