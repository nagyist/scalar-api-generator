import react from '@vitejs/plugin-react'
import { createViteBuildOptions } from '@scalar/build-tooling'
import { defineConfig } from 'vite'
import { preserveDirective } from 'rollup-preserve-directives'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true, rollupTypes: true }), preserveDirective()],
  build: createViteBuildOptions({
    entry: ['src/index.ts'],
    options: {
      outDir: 'dist/react18',
    },
  }),
  resolve: {
    alias: {
      'react': 'react18',
      'react-dom': 'react-dom18',
    },
  },
})
