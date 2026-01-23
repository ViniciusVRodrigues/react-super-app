import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'superApp',
      // Remote modules configuration
      // Add your remote applications here
      remotes: {
        // Example configuration:
        // remoteApp: 'http://localhost:3001/assets/remoteEntry.js',
        todoApp: 'http://localhost:3001/assets/remoteEntry.js',
        despensa_inteligente: 'http://localhost:3002/assets/remoteEntry.js',
      },
      // Shared dependencies between host and remotes
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
