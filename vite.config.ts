import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vercel from 'vite-plugin-vercel'

// vivek W
// follow us on nstsdc.org
export default defineConfig({
  plugins: [vercel(), react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
