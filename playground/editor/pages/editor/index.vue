<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { IComponents } from '~/composables/editor'

definePageMeta({
  layout: 'editor',
})

const editor = useEditor()

const { componentsJson } = storeToRefs(editor)
const components = ref<IComponents[]>([{ componentId: 'editor-nx-5', parentId: 'NX-Editor', name: '按钮', data: [{ dd: [{ name: 'name', value: 'world' }] }, { value: '这就是数据时' }], componentName: 'LdButton', icon: 'i-mdi:button-cursor', prop: { value: '按钮', type: 'primary' } }])
watch(
  () => componentsJson,
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

<style>
img {
  user-select: none;
  pointer-events: none;

}
</style>
