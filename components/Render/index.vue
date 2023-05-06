<script lang="ts" setup>
import type { IComponents } from '~/composables/editor'

const components = defineProp<IComponents[]>('components', { default: [] })
</script>

<template>
  <div flex="~ wrap">
    <template v-if="components.length > 0">
      <template v-for="item in components"  :key="item.componentId">
        <DropTips :id="item.componentId">
          <component :is="resolveComponent(item.componentName)" :id="item.componentId" :nx-data="item" />
        </DropTips>
      </template>
    </template>
  </div>
</template>
