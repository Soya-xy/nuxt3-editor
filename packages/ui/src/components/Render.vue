<script lang="ts" setup>
import { resolveComponent } from 'vue'
import type { IComponents } from '~/types'

withDefaults(defineProps<{
  components: IComponents[]
}>(), {
  components: () => [],
})
</script>

<template>
  <div block>
    <template v-if="components.length > 0">
      <template v-for="item in components" :key="item.componentId">
        <component
          :is="resolveComponent(item.componentName!)" :id="item.componentId" :nx-data="item"
          v-bind="item.prop"
        />
      </template>
    </template>
  </div>
</template>
