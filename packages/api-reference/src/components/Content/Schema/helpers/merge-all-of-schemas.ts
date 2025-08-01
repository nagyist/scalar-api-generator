import type { OpenAPIV3_1 } from '@scalar/openapi-types'

type SchemaObject = OpenAPIV3_1.SchemaObject

/**
 * This is a temporary limit to prevent infinite recursion
 * Incoming new store will replace that approach
 */
const MAX_DEPTH = 20

/**
 * Merges multiple OpenAPI schema objects into a single schema object.
 * Handles nested allOf compositions and merges properties recursively.
 *
 * @param schemas - Array of OpenAPI schema objects to merge
 * @param rootSchema - Optional root schema to merge with the result
 * @returns Merged schema object
 */
export function mergeAllOfSchemas(schemas: SchemaObject[], rootSchema?: SchemaObject, depth = 0): SchemaObject {
  // Handle max depth, empty or invalid input
  if (depth >= MAX_DEPTH || !Array.isArray(schemas) || schemas.length === 0) {
    return rootSchema || {}
  }

  // Merge all schemas into a single object
  const merged = schemas.reduce((result: SchemaObject, schema) => {
    if (!schema || typeof schema !== 'object') {
      return result
    }

    // Handle nested allOf case first
    if (schema.allOf) {
      const mergedNestedSchema = mergeAllOfSchemas(schema.allOf as SchemaObject[], undefined, depth + 1)
      return mergeAllOfSchemas([result, mergedNestedSchema], undefined, depth + 1)
    }

    const mergedResult = typeof result === 'object' ? { ...result } : {}

    // Merge properties if they exist
    if (schema.properties) {
      mergedResult.properties = mergeProperties(mergedResult.properties || {}, schema.properties, depth + 1)
    }

    // Handle items property
    if (schema.items) {
      if (schema.type === 'array') {
        mergedResult.items = mergeArrayItems(mergedResult.items || {}, schema.items, depth + 1)
      }
      // Special case for objects with items.allOf
      else if (typeof schema.type === 'string' && ['object', 'string'].includes(schema.type) && schema.items.allOf) {
        const mergedItems = mergeAllOfSchemas(schema.items.allOf, undefined, depth + 1)
        mergedResult.properties = mergeProperties(
          mergedResult.properties || {},
          mergedItems.properties || {},
          depth + 1,
        )
      }
    }

    // Merge other schema attributes
    return mergeSchemaAttributes(mergedResult, schema, depth + 1)
  }, {})

  // If we have a root schema, merge it with the result
  if (rootSchema) {
    return mergeSchemaAttributes(merged, rootSchema, depth + 1)
  }

  return merged
}

/**
 * Merges two sets of schema properties recursively
 */
function mergeProperties(existingProps: SchemaObject, newProps: SchemaObject, depth = 0): SchemaObject {
  if (depth >= MAX_DEPTH) {
    return existingProps
  }

  const merged = typeof existingProps === 'object' ? { ...existingProps } : {}

  Object.entries(newProps).forEach(([key, value]) => {
    if (!value || typeof value !== 'object') {
      merged[key] = value
      return
    }

    if (!merged[key]) {
      // Handle array items with allOf
      if (value.type === 'array' && value.items?.allOf) {
        merged[key] = {
          ...value,
          items: mergeAllOfSchemas(value.items.allOf, undefined, depth + 1),
        }
      } else if (value.allOf) {
        // Handle direct allOf in property
        merged[key] = mergeAllOfSchemas(value.allOf, undefined, depth + 1)
      } else {
        merged[key] = value
      }
      return
    }

    // Merge existing property with new value
    if (value.allOf) {
      // If the new value has allOf, merge it with the existing property
      merged[key] = mergeAllOfSchemas([merged[key], ...value.allOf], undefined, depth + 1)
    } else if (value.type === 'array' && value.items) {
      // Handle array type properties
      merged[key] = {
        ...merged[key],
        type: 'array',
        items: mergeArrayItems(merged[key].items || {}, value.items, depth + 1),
      }
    } else {
      // For regular objects, merge properties recursively first
      const mergedProperties =
        merged[key].properties || value.properties
          ? mergeProperties(merged[key].properties || {}, value.properties || {}, depth + 1)
          : undefined

      merged[key] = {
        ...merged[key],
        ...value,
      }

      // Ensure properties are not overwritten by the spread
      if (mergedProperties) {
        merged[key].properties = mergedProperties
      }
    }
  })

  return merged
}

/**
 * Merges array items schemas
 */
function mergeArrayItems(existing: Record<string, any>, incoming: Record<string, any>, depth = 0): Record<string, any> {
  if (depth >= MAX_DEPTH) {
    return existing
  }

  // Handle allOf in either schema
  if (existing.allOf || incoming.allOf) {
    const allOfSchemas = [...(existing.allOf || [existing]), ...(incoming.allOf || [incoming])]
    return mergeAllOfSchemas(allOfSchemas, undefined, depth + 1)
  }

  // Regular merge for non-allOf items - preserve existing properties
  const merged = {
    ...existing,
    ...incoming,
  }

  // Recursively merge properties if both have properties
  if (existing.properties && incoming.properties) {
    merged.properties = mergeProperties(existing.properties, incoming.properties, depth + 1)
  }

  return merged
}

/**
 * Merges non-property schema attributes
 */
const mergeSchemaAttributes = (target: SchemaObject, source: SchemaObject, depth = 0): SchemaObject => {
  if (depth >= MAX_DEPTH) {
    return target
  }

  const merged = typeof target === 'object' ? { ...target } : {}

  // Merge required fields with deduplication
  if (source.required && Array.isArray(source.required)) {
    const existingRequired = target.required || []
    const newRequired = source.required
    merged.required = [...new Set([...existingRequired, ...newRequired])]
  }

  // Copy type if not already set (preserve first type)
  if (source.type && !target.type) {
    merged.type = source.type
  }

  // Copy title if not already set (preserve from first schema that has it)
  if (source.title && !target.title) {
    merged.title = source.title
  }

  // Copy name if not already set (preserve from first schema that has it)
  if (source.name && !target.name) {
    merged.name = source.name
  }

  // Copy description if not already set
  if (source.description && !target.description) {
    merged.description = source.description
  }

  // Merge properties if they exist
  if (source.properties) {
    merged.properties = mergeProperties(merged.properties || {}, source.properties, depth + 1)
  }
  // Merge oneOf/anyOf subschemas if present
  ;['oneOf', 'anyOf'].forEach((key) => {
    const options = source[key]

    if (options) {
      options.forEach((option: SchemaObject) => {
        if (option.properties) {
          merged.properties = mergeProperties(merged.properties || {}, option.properties, depth + 1)
        }
      })
    }
  })

  return merged
}
