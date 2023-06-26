<script setup lang='ts'>
/**
 * 按钮
 * @componentName ld-button
 * @icon i-mdi:button-cursor
 * */
withDefaults(defineProps<{
  value: string
  type: 'primary' | 'secondary' | 'outline' | 'dashed' | 'text'
}>(), {
  value: '按钮',
  type: 'primary',
})
defineEmits(['change', 'delete'])
</script>

<template>
  <a-button :type="type" inline-block>
    {{ value }}
    <slot />
    <slot name="footer" />
  </a-button>
</template>
