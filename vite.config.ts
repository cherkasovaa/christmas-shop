import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    root: 'src',
    base: '/',
    build: {
      outDir: './build',
      emptyOutDir: true,
      assetsDir: 'assets',
    },
    server: {
      port: 3000,
      open: true,
    },
  };
});
