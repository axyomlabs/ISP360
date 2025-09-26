import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/isp360',
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // This example separates 'vue' and 'vue-router' into their own chunks.
          if (id.includes('node_modules')) {
            const packagePath = id.toString().split('node_modules/')[1];
            if (packagePath) {
              // Create a chunk for the main library
              const packageName = packagePath.split('/')[0];
              if (['vue', 'vue-router'].includes(packageName)) {
                return packageName;
              }
            }
          }
        },
      },
    },
  },
})
