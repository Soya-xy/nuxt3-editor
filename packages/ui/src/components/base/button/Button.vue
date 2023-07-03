<script setup lang='ts'>
/**
 * 按钮
 * @componentName ld-button
 * @icon i-mdi:button-cursor
 * */
import type { IComponents } from '~/types'

withDefaults(defineProps<{
  value: string
  type: 'primary' | 'secondary' | 'outline' | 'dashed' | 'text'
  nxData: IComponents
  id: string
}>(), {
  value: '按钮',
  type: 'primary',
})

defineEmits(['change', 'delete'])

// value.value = '按钮'
// () => value.value = '动态了'
</script>

<template>
  <a-button :type="type" inline-block>
    {{ value }}
  </a-button>
</template>
