<template>
  <div>
    123
    <slot />
  </div>
</template>

<script setup lang='ts'>
defineOptions({
  customOptions: {
    name: '行',
    icon: 'i-mdi:button-cursor',
    nxType: 'resource',
    prop: {},
    emit: {},
    slot: {
      default: []
    }
  }
})
</script>
