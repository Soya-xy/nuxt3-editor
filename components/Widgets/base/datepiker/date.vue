<script setup lang='ts'>
defineOptions({
  customOptions: {
    name: '日期',
    icon: 'i-mdi:button-cursor',
  },
})
const size = defineProp<'mini' | 'small' | 'medium' | 'large'>('size', { default: 'medium' })
// const format = defineProp<string>('format', { default: 'HH:mm:ss' })
const placeholder = defineProp<string>('placeholder', { default: '请选择时间' })
const value = defineProp<string>('value', { default: '2019-06-03' })
</script>

<template>
  <a-date-picker :size="size" :placeholder="placeholder" :default-value="value" style="width: 194px;" />
</template>
