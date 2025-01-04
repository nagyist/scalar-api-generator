import { serve } from '@hono/node-server'
import { createMockServer } from '@scalar/mock-server'
import fs from 'fs/promises'

const specification = await readOpenApiDocumentFromDisk()

async function readOpenApiDocumentFromDisk() {
  return await fs
    .readFile('./src/specifications/3.1.yaml', 'utf-8')
    .catch(() => {
      console.error('Missing @scalar/galaxy OpenAPI document')
      return ''
    })
}

const port = process.env.PORT || 5052

// Create the server instance
const app = await createMockServer({
  specification,
  onRequest: ({ context }) => {
    console.log(`${context.req.method} ${context.req.url}`)
  },
})

// Read the OpenAPI document on every request
app.get('/_fresh/openapi.yaml', async (c) => {
  const content = await readOpenApiDocumentFromDisk()

  return c.text(content)
})

// Start the server
serve(
  {
    fetch: app.fetch,
    port: Number(port),
  },
  (info: { port: number }) => {
    console.log()
    console.log(`🚧 Mock Server listening on http://localhost:${info.port}`)
    console.log()
  },
)
