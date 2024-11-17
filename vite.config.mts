import { preact } from '@preact/preset-vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    root: 'app',
    build: {
        outDir: '../dist',
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern',
            },
        },
    },
    plugins: [preact()],
});