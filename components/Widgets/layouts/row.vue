<template>
  <div>
    <div v-if="!slots.default">
      <PlaceHolder name="行"></PlaceHolder>
    </div>
    <slot v-else />
  </div>
</template>

<script setup lang='ts'>
defineOptions({
  customOptions: {
    name: '行',
    icon: 'i-mdi:button-cursor',
    emit: {},
    slots: {
      default: []
    }
  }
})

const slots = useSlots()
console.log("🚀 ~ file: row.vue:23 ~ slots:", slots)
</script>
