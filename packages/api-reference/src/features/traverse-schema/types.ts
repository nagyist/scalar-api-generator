import type { ApiReferenceConfiguration } from '@scalar/types/api-reference'

import type { UseNavState } from '@/hooks/useNavState'
import type { OpenAPIV3_1 } from '@scalar/openapi-types'
import type { OperationObject } from '@scalar/workspace-store/schemas/v3.1/strict/path-operations'
import type { SchemaObject } from '@scalar/workspace-store/schemas/v3.1/strict/schema'
import type { TagObject } from '@scalar/workspace-store/schemas/v3.1/strict/tag'
import type { Dereference } from '@scalar/workspace-store/schemas/v3.1/type-guard'
import type { Ref } from 'vue'

/** Map of tagNames and their entries */
export type TagsMap = Map<string, { tag: Dereference<TagObject>; entries: TraversedEntry[] }>

/** Description entry returned form traversing the document */
export type TraversedDescription = {
  id: string
  title: string
  children?: TraversedDescription[]
}

/** Operation entry returned form traversing the document */
export type TraversedOperation = {
  id: string
  title: string
  method: OpenAPIV3_1.HttpMethods
  path: string
  operation: Dereference<OperationObject>
}

/** Model entry returned form traversing the document */
export type TraversedSchema = {
  id: string
  title: string
  name: string
  schema: Dereference<SchemaObject>
}

/** Tag entry returned form traversing the document, includes tagGroups */
export type TraversedTag = {
  id: string
  title: string
  children: TraversedEntry[]
  tag: Dereference<TagObject>
  isGroup: boolean
  isWebhooks?: boolean
}

/** Webhook entry returned form traversing the document, basically the same as an operaation but with name instead of path */
export type TraversedWebhook = {
  id: string
  title: string
  method: OpenAPIV3_1.HttpMethods
  name: string
  webhook: Dereference<OperationObject>
}

/** Entries returned form traversing the document */
export type TraversedEntry =
  | TraversedDescription
  | TraversedOperation
  | TraversedSchema
  | TraversedTag
  | TraversedWebhook

/** Options for traversing the spec */
export type TraverseSpecOptions = {
  config: Ref<ApiReferenceConfiguration>
} & Pick<UseNavState, 'getHeadingId' | 'getModelId' | 'getOperationId' | 'getSectionId' | 'getTagId' | 'getWebhookId'>
