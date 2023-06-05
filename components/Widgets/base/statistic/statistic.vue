<script setup lang='ts'>
defineOptions({
  customOptions: {
    name: '数字显示',
    icon: 'i-mdi:button-cursor',
    props: {
      title: '数字显示',
      value: 450,
      extra: 'Comments',
      precision: 2,
    },
  },
})
const title = defineProp<string>('title', { default: '数字显示' })
const value = defineProp<number>('value', { default: 0 })
const extra = defineProp<string>('extra', { default: 'Comments' })
const precision = defineProp<number>('precision', { default: 2 })
</script>

<template>
  <a-space size="large">
    <a-statistic :title="title" :extra="extra" :value="value" :precision="precision" show-group-separator :value-style="{ color: '#0fbf60' }" />
  </a-space>
</template>
