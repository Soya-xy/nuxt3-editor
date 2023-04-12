<script setup lang="ts">
import type { IComponents } from '~/composables/editor'

const nxid = useNxId()
definePageMeta({
  layout: 'editor',
})

const editor = useEditor()

let components = $ref<IComponents[]>()
watch(
  () => editor.componentsJson,
  () => {
    components = editor.getJson()
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <div :id="`editor-${nxid}`">
    <Render :components="components" />
  </div>
</template>
