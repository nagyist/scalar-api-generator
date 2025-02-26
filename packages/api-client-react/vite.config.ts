import { createViteBuildOptions } from '@scalar/build-tooling'
import react from '@vitejs/plugin-react'
import { preserveDirective } from 'rollup-preserve-directives'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true, rollupTypes: true }), preserveDirective()],
  build: createViteBuildOptions({
    entry: ['src/index.ts'],
  }),
})
