import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'public/manifest.json'
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/js/dashboard.js'
                'public/sw.js',
                
            ],
            refresh: true,
        }),
    ],
});
