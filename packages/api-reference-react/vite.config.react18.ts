import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { createViteBuildOptions } from '@scalar/build-tooling'

export default defineConfig({
  plugins: [react()],
  build: createViteBuildOptions({
    entry: ['src/index.ts'],
    options: {
      outDir: 'dist/react18',
      rollupOptions: {
        output: {
          dir: 'dist/react18',
        },
      },
    },
  }),
  resolve: {
    alias: {
      'react': 'react18',
      'react-dom': 'react-dom18',
    },
  },
})
