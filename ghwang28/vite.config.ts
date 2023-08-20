import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import million from 'million/compiler';

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react(), million.vite({ auto: true })],
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    sourcemap: process.env.NODE_ENV !== 'production'
  }
})
