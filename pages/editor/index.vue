<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { IComponents } from '~/composables/editor'

definePageMeta({
  layout: 'editor',
})

const editor = useEditor()

const { componentsJson } = storeToRefs(editor)
const components = ref<IComponents[]>([])
watch(
  () => componentsJson.value,
  () => {
    components.value = editor.getJson()
    console.log('🚀 ~ file: index.vue:16 ~ components:', components.value)
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <Render v-if="components?.length > 0" :components="components" />
</template>
