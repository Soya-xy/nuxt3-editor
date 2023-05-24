<script lang="ts" setup>
import type { IComponents } from '~/composables/editor'

const components = defineProp<IComponents[]>('components', { default: [] })
</script>

<template>
  <div block>
    <template v-if="components.length > 0">
      <template v-for="item in components" :key="item.componentId">
        <component :is="resolveComponent(item.componentName)" :id="item.componentId" :nx-data="item" v-bind="item.props" />
      </template>
    </template>
  </div>
</template>
