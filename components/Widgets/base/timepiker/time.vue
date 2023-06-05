<script setup lang='ts'>
defineOptions({
  customOptions: {
    name: '时间',
    icon: 'i-mdi:button-cursor',
    props: {
      timeValue: ['09:24:53', '18:44:33'],
      type: 'time-range',
      size: 'medium',
      format: 'HH:mm:ss',
      placeholder: '请选择时间',
    },
  },
})
const type = defineProp<'time' | 'time-range'>('type', { default: 'time-range' })
const timeValue = defineProp<string[]>('timeValue', { default: ['09:24:53', '18:44:33'] })
const size = defineProp<'mini' | 'small' | 'medium' | 'large'>('size', { default: 'small' })
const format = defineProp<string>('format', { default: 'HH:mm:ss' })
const placeholder = defineProp<string>('placeholder', { default: '请选择时间' })
const change = defineEmit()
</script>

<template>
  <a-time-picker :type="type" :size="size" :format="format" :placeholder="placeholder" :default-value="timeValue" style="width: 194px;" @change="change" />
</template>
