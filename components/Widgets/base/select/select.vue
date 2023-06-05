<script setup lang='ts'>
defineOptions({
  customOptions: {
    name: '下拉选择',
    icon: 'i-mdi:button-cursor',
    props: {
      size: 'small',
    },
  },
})
type Size = 'mini' | 'small' | 'medium' | 'large'
const value = defineProp<string>('value', { default: '' })
const size = defineProp<Size>('size', { default: 'radio' })
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
  <a-space direction="vertical" :size="size">
    <a-select :default-value="value" :style="{ width: '320px' }" placeholder="请选择" @change="change">
      <a-option v-for="item in options" :key="item.value">
        {{ item.label }}
      </a-option>
    </a-select>
  </a-space>
</template>
