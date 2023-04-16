<script setup lang="ts">
import type { IComponents } from '~/composables/editor'

const nxid = useNxId()
definePageMeta({
  layout: 'editor',
})

const editor = useEditor()
// editor.componentsJson = [{ componentName: 'Layouts', name: '上中下布局', componentId: 'editor-nx-7', parentId: null }, { componentName: 'BaseButtonBtn', name: '按钮', componentId: 'editor-nx-8', parentId: 'editor-nx-7' }, { componentName: 'BaseButtonBtn', name: '按钮', componentId: 'editor-nx-9', parentId: 'editor-nx-7' }, { componentName: 'BaseButtonBtn', name: '按钮', componentId: 'editor-nx-10', parentId: 'editor-nx-7' }, { componentName: 'BaseCards', name: '卡片', componentId: 'editor-nx-11', parentId: 'NX-Editor' }, { componentName: 'BaseTags', name: '标签', componentId: 'editor-nx-12', parentId: 'editor-nx-11' }]
let components = $ref<IComponents[]>([])
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
