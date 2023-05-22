<template>
  <div>
    <div v-if="!slots.default">
      <PlaceHolder name="列"></PlaceHolder>
    </div>
    <slot v-else />
  </div>
</template>

<script setup lang='ts'>
defineOptions({
  customOptions: {
    name: '列',
    icon: 'i-mdi:button-cursor',
    emit: {},
    slots: {
      default: []
    }
  }
})

const slots = useSlots()
</script>
