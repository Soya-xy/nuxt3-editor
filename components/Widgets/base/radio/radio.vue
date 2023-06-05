<script setup lang='ts'>
defineOptions({
  customOptions: {
    name: '单选',
    icon: 'i-mdi:button-cursor',
  },
})
const value = defineProp<string>('value', { default: '' })
const type = defineProp<'radio' | 'button' >('type', { default: 'radio' })
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
    <a-radio-group :default-value="value" :type="type" :options="options" @change="change" />
  </a-space>
</template>
