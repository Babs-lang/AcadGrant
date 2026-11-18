import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      {
        name: 'copy-static-web-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) return;
          const distDir = path.resolve(__dirname, 'dist');
          for (const file of ['styles.css', 'app.js', 'acadgrant-web.zip']) {
            const srcFile = path.resolve(__dirname, file);
            if (fs.existsSync(srcFile) && fs.existsSync(distDir)) {
              fs.copyFileSync(srcFile, path.join(distDir, file));
            }
          }
          const srcSupabase = path.resolve(__dirname, 'supabase');
          const distSupabase = path.resolve(distDir, 'supabase');
          if (fs.existsSync(srcSupabase) && fs.existsSync(distDir)) {
            fs.cpSync(srcSupabase, distSupabase, { recursive: true, force: true });
          }
        },
      },
    ],
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
