<script setup lang="ts">
import type { IComponents } from '~/composables/editor'

definePageMeta({
  layout: 'editor',
})

const editor = useEditor()
let components = $ref<IComponents[] > ([])
watch(
  () => editor.componentsJson,
  () => {
    components = editor.getJson()
    console.log('🚀 ~ file: index.vue:16 ~ components:', components)
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <Render v-if="components?.length > 0" :components="components" />
</template>
