import { type ResponseAssertions, createResponseAssertions } from './create-response-assertions'

export type ResponseUtils = {
  json: () => any
  text: () => Promise<string>
  status: number
  statusText: string
  headers: Record<string, string>
  to: ResponseAssertions
  responseTime: number
}

export const createResponseUtils = (response: Response): ResponseUtils => {
  let cachedJson: any
  let cachedText: string | undefined

  // Create a promise that will resolve when the text is ready
  const textPromise = response
    .clone()
    .text()
    .then((text) => {
      cachedText = text
      try {
        cachedJson = JSON.parse(text)
      } catch {
        cachedJson = null
      }
    })

  const responseStartTime = performance.now()

  return {
    json: () => {
      if (cachedJson === undefined) {
        throw new Error('JSON response not ready. This is likely a bug.')
      }
      if (cachedJson === null) {
        throw new Error('Response is not valid JSON')
      }
      return cachedJson
    },
    text: async () => {
      await textPromise // Wait for the text to be ready
      if (cachedText === undefined) {
        throw new Error('Text response not ready. This is likely a bug.')
      }
      return cachedText
    },
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries()),
    to: createResponseAssertions(response),
    get responseTime() {
      // TODO: Use actual response time
      return Number((performance.now() - responseStartTime).toFixed(2))
    },
  }
}
