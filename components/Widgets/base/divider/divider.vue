<script setup lang='ts'>
type Direction = 'horizontal' | 'vertical'
type Type = 'solid' | 'dashed' | 'dotted' | 'double'
defineOptions({
  customOptions: {
    name: '分割线',
    icon: 'i-tabler:line-dashed',
    props: {
      direction: 'horizontal',
      type: 'solid',
      size: 1,
    },
  },
})
const type = defineProp<Type>('type', { default: 'solid' })
const direction = defineProp<Direction>('direction', { default: 'horizontal' })
const size = defineProp<number>('size', { default: 1 })
</script>

<template>
  <a-divider :type="type" :direction="direction" :size="size" />
</template>
