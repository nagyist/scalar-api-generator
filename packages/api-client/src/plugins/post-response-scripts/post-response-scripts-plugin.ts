import { type TestResult, executePostResponseScript } from '@/libs/execute-scripts'
import { TestResults } from '@/plugins/post-response-scripts/components/TestResults'
import type { Operation } from '@scalar/oas-utils/entities/spec'
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
      async onResponseReceived({ response, operation }) {
        await executePostResponseScript(operation['x-post-response'], {
          response,
          onTestResultsUpdate: (newResults) => (results.value = [...newResults]),
        })
      },
    },
  }
}
