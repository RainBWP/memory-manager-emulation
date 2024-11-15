import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/memory-manager-emulation/', // Set this to your repository name
  plugins: [react()],
  server: {
    open: true,
    port: 3000,
  },
})