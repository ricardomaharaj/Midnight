import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Midnight',
        short_name: 'Midnight',
        description: 'A minimal Reddit experience',
        icons: [
          {
            src: 'logo16.png',
            sizes: '16x16',
            type: 'image/png'
          },
          {
            src: 'logo32.png',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            src: 'logo192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        start_url: '.',
        theme_color: '#222',
        background_color: '#222'
      },
      registerType: 'autoUpdate'
    })
  ]
})
