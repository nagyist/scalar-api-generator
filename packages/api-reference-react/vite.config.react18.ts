import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import pkg from './package.json'

export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true, rollupTypes: true })],
  build: {
    outDir: 'dist/react18',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: './src/index.ts',
      name: '@scalar/api-reference-react',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.ts'),
      },
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        exports: 'named',
        globals: {
          'react': 'React',
          'react-dom': 'react-dom',
        },
      },
    },
  },
  resolve: {
    alias: {
      'react': 'react18',
      'react-dom': 'react-dom18',
    },
  },
})
