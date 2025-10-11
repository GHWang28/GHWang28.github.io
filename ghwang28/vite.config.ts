import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import million from 'million/compiler';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), million.vite({ auto: true })],
  build: {
    sourcemap: false,
  },
  server: {
    port: 3000,
    open: true
  },
  optimizeDeps: {
    include: ['@mui/material/Tooltip', '@emotion/styled', "@mui/material/Box"],
  },
})
