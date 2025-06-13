import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(() => {
  return {
    root: 'src',
    build: {
      outDir: '../build',
      emptyOutDir: true,
      assetsDir: 'assets',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/index.html'),
          gifts: resolve(__dirname, 'src/gifts.html'),
        },
      },
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: 'assets/**/*',
            dest: 'assets',
          },
        ],
      }),
    ],
    server: {
      port: 3000,
      open: true,
    },
  };
});
