import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
  plugins: [
    vue(), 
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        sourcemap: true
      },
      includeAssets: ['vite.svg'],
      manifest: {
        name: 'Nails & Hair',
        short_name: 'Nails & Hair',
        description: 'Nails & Hair',
        theme_color: '#FF69B4',
        icons: [
          {
            src: 'nails&hair.jpg',
            sizes: '192x192',
            type: 'image/jpg'
          },
          {
            src: 'nails&hair.jpg',
            sizes: '512x512',
            type: 'image/jpg'
          }
        ]
      }
    })],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['*', '.js', '.vue', '.json', '.ts']
  },
});