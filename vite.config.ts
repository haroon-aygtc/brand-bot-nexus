
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { componentTagger } from "lovable-tagger"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 8080,
      host: "::",
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    optimizeDeps: {
      include: [
        'react', 
        'react-dom', 
        'react-router', 
        'react-router-dom',
        '@radix-ui/react-slot',
        '@radix-ui/react-compose-refs'
      ],
      esbuildOptions: {
        platform: 'browser',
      },
    },
    build: {
      commonjsOptions: {
        include: [],
      },
      rollupOptions: {
        external: [],
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
            'ui-vendor': Object.keys(require('./package.json').dependencies)
              .filter(dep => dep.includes('@radix-ui') || dep.includes('next-themes'))
          }
        }
      }
    },
  }
})
