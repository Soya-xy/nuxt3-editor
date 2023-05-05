<script lang="ts" setup>
import type { IComponents } from '~/composables/editor'
const components = defineProp<IComponents[]>('components', { default: [] })
</script>

<template>
  <div>
    <div v-if="components.length > 0">
      <div v-for="item in components" :id="item.componentId">
        <component :is="resolveComponent(item.componentName)" :id="item.componentId" :nxData="item"></component>
      </div>
    </div>
  </div>
</template>
