<script lang="ts" setup>
import { ScalarCodeBlock } from '@scalar/components'
import { getExampleFromSchema } from '@scalar/oas-utils/spec-getters'
import type { ExampleObject } from '@scalar/workspace-store/schemas/v3.1/strict/example'
import type { MediaTypeObject } from '@scalar/workspace-store/schemas/v3.1/strict/media-header-encoding'

defineProps<{
  response: MediaTypeObject | undefined
  example: ExampleObject
}>()
</script>
<template>
  <!-- Example -->
  <ScalarCodeBlock
    v-if="example !== undefined"
    class="bg-b-2 -outline-offset-2"
    :content="example?.value"
    lang="json" />

  <!-- Schema -->
  <ScalarCodeBlock
    v-else-if="response?.schema"
    class="bg-b-2 -outline-offset-2"
    :content="
      getExampleFromSchema(response?.schema, {
        emptyString: 'string',
        mode: 'read',
      })
    "
    lang="json" />

  <div
    v-else
    class="empty-state">
    No Body
  </div>
</template>

<style scoped>
.empty-state {
  margin: 10px 0 10px 12px;
  text-align: center;
  font-size: var(--scalar-mini);
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--scalar-radius-lg);
  color: var(--scalar-color-2);
}

.rule-title {
  font-family: var(--scalar-font-code);
  color: var(--scalar-color-1);
  display: inline-block;
  margin: 12px 0 6px;
  border-radius: var(--scalar-radius);
}

.rule {
  margin: 0 12px 0;
  border-radius: var(--scalar-radius-lg);
}

.rule-items {
  counter-reset: list-number;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-left: 1px solid var(--scalar-border-color);
  padding: 12px 0 12px;
}
.rule-item {
  counter-increment: list-number;
  border: 1px solid var(--scalar-border-color);
  border-radius: var(--scalar-radius-lg);
  overflow: hidden;
  margin-left: 24px;
}
.rule-item:before {
  /* content: counter(list-number); */
  border: 1px solid var(--scalar-border-color);
  border-top: 0;
  border-right: 0;
  content: ' ';
  display: block;
  width: 24px;
  height: 6px;
  border-radius: 0 0 0 var(--scalar-radius-lg);
  margin-top: 6px;
  color: var(--scalar-color-2);
  transform: translateX(-25px);
  color: var(--scalar-color-1);
  position: absolute;
}
</style>
