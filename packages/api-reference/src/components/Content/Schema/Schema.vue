<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ScalarIcon, ScalarMarkdown } from '@scalar/components'
import type { OpenAPIV3_1 } from '@scalar/openapi-types'
import { computed, inject } from 'vue'

import ScreenReader from '@/components/ScreenReader.vue'
import type { Schemas } from '@/features/Operation/types/schemas'
import { DISCRIMINATOR_CONTEXT } from '@/hooks/useDiscriminator'

import { isTypeObject } from './helpers/is-type-object'
import SchemaHeading from './SchemaHeading.vue'
import SchemaObjectProperties from './SchemaObjectProperties.vue'
import SchemaProperty from './SchemaProperty.vue'

const props = withDefaults(
  defineProps<{
    value?:
      | OpenAPIV3_1.OperationObject
      | OpenAPIV3_1.SchemaObject
      | OpenAPIV3_1.ArraySchemaObject
      | OpenAPIV3_1.NonArraySchemaObject
      | OpenAPIV3_1.SchemaObject
      | OpenAPIV3_1.ArraySchemaObject
      | OpenAPIV3_1.NonArraySchemaObject
    /** Track how deep we've gone */
    level?: number
    /* Show as a heading */
    name?: string
    /** A tighter layout with less borders and without a heading */
    compact?: boolean
    /** Shows a toggle to hide/show children */
    noncollapsible?: boolean
    hideHeading?: boolean
    /** Show a special one way toggle for additional properties, also has a top border when open */
    additionalProperties?: boolean
    /** Hide model names in type display */
    hideModelNames?: boolean
    /** All schemas for model name retrieval */
    schemas?: Schemas
    /** Selected discriminator */
    discriminator?: string
    /** Discriminator mapping */
    discriminatorMapping?: Record<string, string>
    /** Discriminator property name */
    discriminatorPropertyName?: string
    /** Whether the schema has a discriminator */
    hasDiscriminator?: boolean
    /** Breadcrumb for the schema */
    breadcrumb?: string[]
  }>(),
  { level: 0, noncollapsible: false, hideModelNames: false },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// Inject the discriminator context
const discriminatorContext = inject(DISCRIMINATOR_CONTEXT, null)

// Use injected context values or fallback to props for backward compatibility
const discriminatorMapping = computed(
  () =>
    discriminatorContext?.value?.discriminatorMapping ||
    props.discriminatorMapping ||
    {},
)
const discriminatorPropertyName = computed(
  () =>
    discriminatorContext?.value?.discriminatorPropertyName ||
    props.discriminatorPropertyName ||
    '',
)
const discriminator = computed(
  () => discriminatorContext?.value?.selectedType || props.discriminator,
)

/* Returns the resolved schema from discriminator context when available for display */
const schema = computed(() => {
  // Get the merged schema from the discriminator context
  const mergedSchema = discriminatorContext?.value?.mergedSchema

  // Get the original schema from the props
  const originalSchema = props.value

  // If the merged schema is an object schema and the original schema is an object schema, return the merged schema
  if (
    mergedSchema &&
    props.level === 0 &&
    props.hasDiscriminator &&
    isTypeObject(originalSchema) &&
    isTypeObject(mergedSchema)
  ) {
    return mergedSchema
  }

  // Otherwise fall back to the resolved schema prop or value prop
  return props.value
})

const shouldShowToggle = computed(() => {
  if (props.noncollapsible || props.level === 0) {
    return false
  }

  return true
})

/** Gets the description to show for the schema */
const schemaDescription = computed(() => {
  // Special handling for allOf compositions
  if (
    schema.value?.allOf &&
    Array.isArray(schema.value.allOf) &&
    // Because we don't want it to show in models
    props.name === 'Request Body'
  ) {
    // Lets show the base description if it exists
    if (schema.value.description) {
      return schema.value.description
    }

    // Otherwise grab the first description
    const firstSchemaWithDescription = schema.value.allOf.find(
      (item) => item.description && typeof item.description === 'string',
    )
    if (firstSchemaWithDescription?.description) {
      return firstSchemaWithDescription.description
    }
  }

  // Don't show description if there's no description or it's not a string
  if (
    !schema.value?.description ||
    typeof schema.value.description !== 'string'
  ) {
    return null
  }

  // Don't show description if the schema has other composition keywords
  // This prevents duplicate descriptions when individual schemas are part of compositions
  if (schema.value.oneOf || schema.value.anyOf) {
    return null
  }

  // Don't show description for enum schemas (they have special handling)
  if (schema.value.enum) {
    return null
  }

  // Will be shown in the properties anyway
  if (
    !schema.value.properties &&
    !schema.value.patternProperties &&
    !schema.value.additionalProperties
  ) {
    return null
  }

  // Merged allOf schemas at level 0 should not show individual descriptions
  // to prevent duplicates with the request body description
  if (props.level === 0) {
    return null
  }

  // Return the schema's own description
  return schema.value.description
})

// Prevent click action if noncollapsible
const handleClick = (e: MouseEvent) =>
  props.noncollapsible && e.stopPropagation()

const handleDiscriminatorChange = (type: string) => {
  emit('update:modelValue', type)
}
</script>
<template>
  <Disclosure
    v-if="typeof value === 'object' && Object.keys(value).length"
    v-slot="{ open }"
    :defaultOpen="noncollapsible">
    <div
      class="schema-card"
      :class="[
        `schema-card--level-${level}`,
        { 'schema-card--compact': compact, 'schema-card--open': open },
        { 'border-t': additionalProperties && open },
      ]">
      <!-- Schema description -->
      <div
        v-if="schemaDescription"
        class="schema-card-description">
        <ScalarMarkdown :value="schemaDescription" />
      </div>
      <div
        class="schema-properties"
        :class="{
          'schema-properties-open': open,
        }">
        <!-- Toggle to collapse/expand long lists of properties -->
        <div
          v-if="additionalProperties"
          v-show="!open"
          class="schema-properties">
          <DisclosureButton
            as="button"
            class="schema-card-title schema-card-title--compact"
            @click.capture="handleClick">
            <ScalarIcon
              class="schema-card-title-icon"
              icon="Add"
              size="sm" />
            Show additional properties
            <ScreenReader v-if="name">for {{ name }}</ScreenReader>
          </DisclosureButton>
        </div>

        <DisclosureButton
          v-else-if="shouldShowToggle"
          v-show="!hideHeading && !(noncollapsible && compact)"
          :as="noncollapsible ? 'div' : 'button'"
          class="schema-card-title"
          :class="{ 'schema-card-title--compact': compact }"
          :style="{
            top: `calc(var(--refs-header-height) +  calc(var(--schema-title-height) * ${level}))`,
          }"
          @click.capture="handleClick">
          <template v-if="compact">
            <ScalarIcon
              class="schema-card-title-icon"
              :class="{ 'schema-card-title-icon--open': open }"
              icon="Add"
              size="sm" />
            <template v-if="open">
              Hide {{ value?.title ?? 'Child Attributes' }}
            </template>
            <template v-else>
              Show {{ value?.title ?? 'Child Attributes' }}
            </template>
            <ScreenReader v-if="name">for {{ name }}</ScreenReader>
          </template>
          <template v-else>
            <ScalarIcon
              class="schema-card-title-icon"
              :class="{ 'schema-card-title-icon--open': open }"
              icon="Add"
              size="sm" />
            <SchemaHeading
              :name="value?.title ?? name"
              :value="value" />
          </template>
        </DisclosureButton>
        <DisclosurePanel
          v-if="!additionalProperties || open"
          as="ul"
          :static="!shouldShowToggle">
          <!-- Object properties -->
          <SchemaObjectProperties
            v-if="isTypeObject(schema)"
            :breadcrumb="breadcrumb"
            :schema="schema"
            :compact="compact"
            :hideHeading="hideHeading"
            :level="level + 1"
            :hideModelNames="hideModelNames"
            :schemas="schemas"
            :discriminator="discriminator"
            :discriminatorMapping="discriminatorMapping"
            :discriminatorPropertyName="discriminatorPropertyName"
            :hasDiscriminator="hasDiscriminator"
            @update:modelValue="handleDiscriminatorChange" />

          <!-- Not an object -->
          <template v-else>
            <SchemaProperty
              v-if="schema"
              :breadcrumb="breadcrumb"
              :compact="compact"
              :hideHeading="hideHeading"
              :hideModelNames="hideModelNames"
              :level="level"
              :name="(schema as OpenAPIV3_1.SchemaObject).name"
              :schemas="schemas"
              :value="
                value.discriminator?.propertyName === name ? value : schema
              "
              :discriminatorMapping="discriminatorMapping"
              :discriminatorPropertyName="discriminatorPropertyName"
              :modelValue="discriminator"
              @update:modelValue="handleDiscriminatorChange" />
          </template>
        </DisclosurePanel>
      </div>
    </div>
  </Disclosure>
</template>
<style scoped>
.error {
  background-color: var(--scalar-color-red);
}
.schema-card {
  z-index: 0;
  font-size: var(--scalar-font-size-4);
  color: var(--scalar-color-1);
}
.schema-card-title {
  height: var(--schema-title-height);

  padding: 6px 8px;

  display: flex;
  align-items: center;
  gap: 4px;

  color: var(--scalar-color-2);
  font-weight: var(--scalar-semibold);
  font-size: var(--scalar-mini);
  border-bottom: var(--scalar-border-width) solid transparent;
}
button.schema-card-title {
  cursor: pointer;
}
button.schema-card-title:hover {
  color: var(--scalar-color-1);
}
.schema-card-title-icon--open {
  transform: rotate(45deg);
}
.schema-properties-open > .schema-card-title {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: var(--scalar-border-width) solid var(--scalar-border-color);
}
.schema-properties-open > .schema-properties {
  width: fit-content;
}
.schema-card-description {
  color: var(--scalar-color-2);
}
.schema-card-description + .schema-properties {
  width: fit-content;
}
.schema-card-description + .schema-properties {
  margin-top: 8px;
}
.schema-properties-open.schema-properties,
.schema-properties-open > .schema-card--open {
  width: 100%;
}

.schema-properties {
  display: flex;
  flex-direction: column;

  border: var(--scalar-border-width) solid var(--scalar-border-color);
  border-radius: var(--scalar-radius-lg);
  width: fit-content;
}
.schema-properties-name {
  width: 100%;
}
.schema-properties .schema-properties {
  border-radius: 13.5px;
}
.schema-properties .schema-properties.schema-properties-open {
  border-radius: var(--scalar-radius-lg);
}
.schema-properties-open {
  width: 100%;
}
.schema-card--compact {
  align-self: flex-start;
}
.schema-card--compact.schema-card--open {
  align-self: initial;
}
.schema-card-title--compact {
  color: var(--scalar-color-2);
  padding: 6px 10px 6px 8px;
  height: auto;
  border-bottom: none;
}
.schema-card-title--compact > .schema-card-title-icon {
  margin: 0;
}
.schema-card-title--compact > .schema-card-title-icon--open {
  transform: rotate(45deg);
}
.schema-properties-open > .schema-card-title--compact {
  position: static;
}
.property--level-0
  > .schema-properties
  > .schema-card--level-0
  > .schema-properties {
  border: none;
}
.property--level-0
  .schema-card--level-0:not(.schema-card--compact)
  .property--level-1 {
  padding: 0 0 8px;
}
:not(.composition-panel)
  > .schema-card--compact.schema-card--level-0
  > .schema-properties {
  border: none;
}
:deep(.schema-card-description) p {
  font-size: var(--scalar-small, var(--scalar-paragraph));
  color: var(--scalar-color-2);
  line-height: 1.5;
  margin-bottom: 0;
  display: block;
  margin-bottom: 6px;
}
.children .schema-card-description:first-of-type {
  padding-top: 0;
}
</style>
