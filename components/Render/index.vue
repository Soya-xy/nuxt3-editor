<script lang="ts" setup>
import type { IComponents } from '~/composables/editor'

const components = defineProp<IComponents[]> ('components', { default: [] })
</script>

<template>
  <div>
    <div v-if="components.length > 0">
      <div v-for="item in components" :id="item.componentId" :key="item.componentId">
        <component :is="resolveComponent(item.componentName)" :id="item.componentId" :nx-data="item" />
      </div>
    </div>
  </div>
</template>
