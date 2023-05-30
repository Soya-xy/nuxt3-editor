<script setup lang='ts'>
type Position = 'left' | 'right' | 'top' | 'bottom'
type Type = 'line' | 'card' | 'card-gutter' | 'text' | 'rounded' | 'capsule'
type Size = 'mini' | 'small' | 'medium' | 'large'
type Direction = 'horizontal' | 'vertical'
defineOptions({
  customOptions: {
    name: 'tab页',
    icon: 'i-mdi:button-cursor',
    props: {
      position: 'left',
      type: 'line',
      size: 'small',
    },
  },
})
const type = defineProp<Type>('type', { default: 'line' })
const position = defineProp<Position>('position', { default: 'direction' })
const size = defineProp<Size>('size', { default: 'small' })
const direction = defineProp<Direction>('vertical', { default: 'horizontal' })
</script>

<template>
  <a-tabs :type="type" :position="position" :size="size" :direction="direction" default-active-key="2" lazy-load>
    <a-tab-pane key="1" title="Tab 1">
      Content of Tab Panel 1
    </a-tab-pane>
    <a-tab-pane key="2" title="Tab 2">
      Content of Tab Panel 2
    </a-tab-pane>
    <a-tab-pane key="3" title="Tab 3">
      Content of Tab Panel 3
    </a-tab-pane>
  </a-tabs>
</template>
