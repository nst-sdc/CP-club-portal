import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// vivek W
// follow us on nstsdc.org
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
