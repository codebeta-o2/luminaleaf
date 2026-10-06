import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const originalName = assetInfo.name || 'asset';
            const ext = path.extname(originalName);
            const base = originalName.slice(0, originalName.length - ext.length);
            const cleanBase = base
              .replace(/[\s,()'"%]+/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '');
            return `assets/${cleanBase}-[hash][extname]`;
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
