import react from '@vitejs/plugin-react'
import { createViteBuildOptions } from '@scalar/build-tooling'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: createViteBuildOptions({
    entry: ['src/index.ts'],
  }),
})
