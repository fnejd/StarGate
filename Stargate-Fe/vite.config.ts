import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  server: {
    // host: 'localhost',
    port: 3000,
    // 프록시 추가
    proxy: {
      '/api': {
        target: 'ws://i9a406.p.ssafy.io:8080/rtc',
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
});

export default viteConfig;
