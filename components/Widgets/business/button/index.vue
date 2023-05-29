<script setup lang='ts'>
defineOptions({
  customOptions: {
    name: '业务按钮',
    icon: 'i-mdi:button-cursor',
  },
})
const value = defineProp<string>('业务按钮')
</script>

<template>
  <div inline-block>
    <a-button type="primary">
      {{ value }}
    </a-button>
  </div>
</template>
