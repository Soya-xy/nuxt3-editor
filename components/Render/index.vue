<script setup lang='ts'>
import type { IComponents } from '~/composables/editor'

const isArray = isArr
const components = defineProp<IComponents>('components', {
  default: {},
})

const renderComponent = computed(() => {
  if (components.value.componentName)
    return resolveComponent(components.value.componentName)
})
</script>

<template>
  <div :id="components.componentId">
    <component :is="renderComponent" v-if="components.componentName" />
  </div>
  <template v-if="isArray(components) && components.length > 0">
    <template v-for="v in components" :key="v">
      <Render :components="v" />
    </template>
  </template>
  <template v-else>
    <Render v-if="components.children" :components="components.children" />
  </template>
</template>
