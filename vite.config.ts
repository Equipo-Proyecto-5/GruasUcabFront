import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
  //Quitar esto cuando se configure el cors en el backend
  server: {
    proxy: {
      '/Proveedores': {
        target: 'https://localhost:7255', // URL de tu backend
        changeOrigin: true, // Cambia el origen de la solicitud
        secure: false, // Establecer en false para localhost// Opcional: reescritura de URL si es necesario
      },
    },
  },
});
