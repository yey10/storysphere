import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: parseInt(process.env.PORT) || 4173, // Usar el puerto proporcionado por Railway
    host: true, // Permite acceso desde cualquier interfaz
  },
  plugins: [react()],
  base: "/"
})
