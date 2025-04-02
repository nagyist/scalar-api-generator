import { type TestResult, executePostResponseScript } from '@/libs/execute-scripts'
import { TestResults } from '@/plugins/post-response-scripts/components/TestResults'
import type { Operation } from '@scalar/oas-utils/entities/spec'
import { httpStatusCodes } from '@scalar/oas-utils/helpers'
import { type Component, ref } from 'vue'
import { PostResponseScripts } from './components/PostResponseScripts'

// TODO: Reset test results for new request
// testResults.value = []

// TODO: Move to a central place, e.g. @scalar/types
export type ApiClientPlugin = () => {
  name: string
  views: {
    'request.section': {
      title?: string
      component: Component
      props?: Record<string, any>
    }[]
    'response.section': {
      title?: string
      component: Component
      props?: Record<string, any>
    }[]
  }
  hooks: {
    onResponseReceived: ({ response, operation }: { response: Response; operation: Operation }) => void
  }
}

export const postResponseScriptsPlugin: ApiClientPlugin = () => {
  const results = ref<TestResult[]>([])

  return {
    name: 'post-response-scripts',
    views: {
      'request.section': [
        {
          title: 'Scripts',
          component: PostResponseScripts,
        },
      ],
      'response.section': [
        {
          title: 'Tests',
          component: TestResults,
          props: {
            results,
          },
        },
      ],
    },
    hooks: {
      async onResponseReceived({ response: givenResponse, operation }) {
        // Create a new response with the statusText
        const response = givenResponse.clone()

        // This is missing in HTTP/2 requests. But we need it for the post-response scripts.
        const statusText = response.statusText || httpStatusCodes[response.status]?.name || ''

        const normalizedResponse = new Response(response.body, {
          status: response.status,
          statusText,
          headers: response.headers,
        })

        await executePostResponseScript(operation['x-post-response'], {
          response: normalizedResponse,
          onTestResultsUpdate: (newResults) => (results.value = [...newResults]),
        })
      },
    },
  }
}
