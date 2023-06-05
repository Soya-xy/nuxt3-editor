<script setup lang='ts'>
defineOptions({
  customOptions: {
    name: '复选',
    icon: 'i-mdi:button-cursor',
  },
})
const value = defineProp<any>('value', { default: [] })
const options = defineProp<any>('options', {
  default: [{
    label: '选项一',
    value: '1',
  },
  {
    label: '选项二',
    value: '2',
  },
  {
    label: '选项三',
    value: '3',
  }],
})
const change = defineEmit()
</script>

<template>
  <a-space direction="vertical" size="large">
    <a-checkbox-group :default-value="value" :options="options" @change="change" />
  </a-space>
</template>
