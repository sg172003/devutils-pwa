import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['devutils-icon.svg'],
      manifest: {
        name: 'DevUtils — Developer Utilities',
        short_name: 'DevUtils',
        description: 'Fast, private, client-side developer tools. JSON Formatter, Dummy Data Generator, JWT Decoder.',
        theme_color: '#6366F1',
        background_color: '#0f1117',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'devutils-icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'devutils-icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'devutils-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'devutils-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
