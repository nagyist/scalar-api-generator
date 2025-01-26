import { ModernLayout } from '@scalar/api-reference'
import { fetchSpecFromUrl } from '@scalar/oas-utils/helpers'
import { parseSchema } from '@scalar/oas-utils/transforms'
import { createSSRApp, h } from 'vue'
import { renderToWebStream } from 'vue/server-renderer'

const spec = await fetchSpecFromUrl(
  'https://cdn.jsdelivr.net/npm/@scalar/galaxy/dist/latest.yaml',
)
const { schema } = await parseSchema(spec, { shouldLoad: true })
const css = await Bun.file(
  './node_modules/@scalar/api-reference/dist/style.css',
).text()

const app = createSSRApp({
  render: () =>
    h(ModernLayout, {
      configuration: {
        darkMode: true,
        showSidebar: true,
      },
      parsedSpec: schema,
      rawSpec: JSON.stringify(schema),
    }),
})

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const appStream = renderToWebStream(app)

    const wrapperTransform = new TransformStream({
      start(controller) {
        controller.enqueue(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>${css}</style>
            </head>
            <body class="dark-mode">
              <div class="scalar-app" id="app">
        `)
      },
      transform(chunk, controller) {
        controller.enqueue(chunk)
      },
      flush(controller) {
        controller.enqueue(`
              </div>
            </body>
          </html>
        `)
      },
    })

    return new Response(appStream.pipeThrough(wrapperTransform), {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'max-age=604800',
      },
    })
  },
})

console.log(`Listening on http://localhost:${server.port} ...`)
