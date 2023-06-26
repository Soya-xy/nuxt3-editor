<script setup lang='ts'>
import { useSlots } from 'vue'
import { LdConfig } from '..'

withDefaults(defineProps<{
  name: string
}>(), {
  name: '占位符',
})
const slots = useSlots()
</script>

<template>
  <div v-if="LdConfig.isDev">
    <slot>
      <div v-if="slots.default" class="shell">
        <div class="inner">
          {{ name }}
        </div>
      </div>
    </slot>
  </div>
</template>

<style scoped>
.shell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  padding: 4px;
  opacity: 0.4;
  flex-shrink: 1;
  box-sizing: border-box;
  user-select: none;
}

.inner {
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  border: dashed 1px;
  background-color: var(--color-neutral-3);
  color: var(--color-neutral-10);
}
</style>
