import { TestResults } from '@/plugins/post-response-scripts/components/TestResults'
import type { Component } from 'vue'
import { PostResponseScripts } from './components/PostResponseScripts'

// TODO: Move to a central place, e.g. @scalar/types
export type ApiClientPlugin = () => {
  name: string
  views: {
    'request.section': {
      title?: string
      component: Component
    }[]
  }
}

export const postResponseScriptsPlugin: ApiClientPlugin = () => {
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
        },
      ],
    },
  }
}
