import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    // Base path for GitHub Pages (e.g., /react-super-app/)
    base: env.VITE_BASE_PATH || '/',
    
    plugins: [
      react(),
      federation({
        name: 'superApp',
        // Remote modules configuration
        // URLs can be configured via environment variables
        remotes: {
          // Use environment variables or fallback to localhost for development
          todoApp: env.VITE_TODO_APP_URL || 'http://localhost:3001/assets/remoteEntry.js',
          despensa_inteligente: env.VITE_DESPENSA_APP_URL || 'http://localhost:3002/assets/remoteEntry.js',
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
  }
})
