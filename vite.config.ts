
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
        // Force React to resolve to the same instance
        'react': path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        'react/jsx-runtime': path.resolve(__dirname, './node_modules/react/jsx-runtime'),
      },
    },
    server: {
      port: 8080,
      host: "::",
      proxy: {
        '/api': {
          target: 'http://laravel-backend.test',
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
      force: true, // Force optimization to resolve dependency issues
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true,
      },
      rollupOptions: {
        onwarn(warning, warn) {
          // Ignore certain warnings
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
            return
          }
          if (warning.code === 'SOURCEMAP_ERROR') {
            return
          }
          // Use default for everything else
          warn(warning)
        },
        external: [],
        output: {
          manualChunks(id) {
            // Create separate chunks for React
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'react-vendor'
            }
            // Create separate chunks for Radix UI components
            if (id.includes('@radix-ui') || id.includes('next-themes')) {
              return 'ui-vendor'
            }
          }
        }
      }
    },
  }
})
