<script setup lang='ts'>
defineOptions({
  customOptions: {
    name: '按钮',
    icon: 'i-mdi:button-cursor',
    props: {
      value: '测试',
      type: 'outline',
    },
  },
})
const value = defineProp<string>('value', { default: '按钮332' })
const type = defineProp<'primary' | 'secondary' | 'outline' | 'dashed' | 'text'>('type', { default: 'primary' })
</script>

<template>
  <a-button :type="type" inline-block>
    {{ value }}
  </a-button>
</template>
