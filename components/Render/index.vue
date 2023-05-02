<script lang="tsx" setup>
import type { IComponents } from '~/composables/editor'

const components = defineProp<IComponents>('components')
console.log('🚀 ~ file: index.vue:5 ~ components:', components)
const haveSlot = defineProp<boolean>('haveSlot')
const slotName = defineProp<string>('slotName')

const tag = resolveComponent(components.value.componentName)

const RenderComponent = defineComponent(() => {
  return () => <tag />
})
</script>

<template>
  <RenderComponent />
</template>
