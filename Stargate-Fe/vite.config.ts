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
      '/api': {
        target: 'https://www.stargate-a406.kro.kr/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
      '/font': {
        target: 'https://stargate-a406.s3.ap-northeast-2.amazonaws.com/',
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  esbuild: {},
  plugins: [react()],
});

export default viteConfig;
