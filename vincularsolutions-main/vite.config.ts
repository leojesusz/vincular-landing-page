import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: './', // Força o Vite a olhar para a raiz do projeto
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html', // Simplifique para ver se ele entende o caminho relativo direto
    },
  },
  },
ls)
