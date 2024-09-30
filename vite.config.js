import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        VitePWA({
           registerType:"auto",
            workbox: {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{css,png,jpg,ico,js,txt}'
	],
	
	runtimeCaching: [{
    urlPattern: ({request, url}) =>url.includes("cdn")==true,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'cdns',
      expiration: {
        maxEntries: 20,
	maxAgeSeconds: 2 * 24 * 60 * 60,
      },
      cacheableResponse:{
	statuses: [0, 200]
      }
    },
  },{
    urlPattern: ({request, url}) => request.method=="POST",
    handler:"NetworkOnly",
    method:"POST",
    options:{
      cacheName:"apCachePost",
      cacheableResponse:{
	statuses: [0, 200]
      },
      backgroundSync:{
       name:"Apisync",
       options:{
    	maxRetentionTime:24*60*2
       }
      }
    }
  },{
    urlPattern: ({request, url}) =>url.includes("fonts")==true,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'cdns',
      expiration: {
        maxEntries: 20,
	maxAgeSeconds: 2 * 24 * 60 * 60,
      },
      cacheableResponse:{
	statuses: [0, 200]
      }
    }
  }],
   swDest: 'public/sw.js'
}}),
        laravel({
            input: [
              //  'public/manifest.json'
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/js/dashboard.js',
                'resources/js/swreg.js'
                
            ],
            refresh: true,
        }),
    ],
});
