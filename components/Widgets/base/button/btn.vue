<script setup lang='ts'>
defineOptions({
  customOptions: {
    name: '按钮',
    icon: 'i-mdi:button-cursor',
    props: {
      value: '测试',
      type: 'primary'
    }
  }
})
const value = defineProp<string>('value', { default: '按钮' })
console.log("🚀 ~ file: btn.vue:12 ~ value:", value)

</script>

<template>
  <a-button type="primary" inline-block>
    {{ value }}
  </a-button>
</template>
