import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/personal-trainerViteAppv1/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
