<script setup lang='ts'>
/**
 * 按钮
 * @componentName ld-button
 * @icon i-mdi:button-cursor
 * */
defineProps<{
  value: string
  type: 'primary' | 'secondary' | 'outline' | 'dashed' | 'text'
}>()
defineEmits(['change', 'delete'])
</script>

<template>
  <a-button :type="type" inline-block>
    {{ value }}
  </a-button>
</template>
