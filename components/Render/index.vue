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
  <span v-if="components.componentName" :id="components.componentId" block w-10>
    {{ components.name }}
    <component :is="renderComponent" />
  </span>
  <template v-if="isArray(components) && components.length > 0">
    <template v-for="v, k in components" :key="v">
      {{ k }}:<Render :components="v" />
    </template>
  </template>
  <template v-else>
    <Render v-if="components.children" :components="components.children" />
  </template>
</template>
