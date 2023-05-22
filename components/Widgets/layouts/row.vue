<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang='ts'>
defineOptions({
  name: '行',
  icon: 'i-mdi:button-cursor',
  nxType: 'resource',
  haveSlots: true,
})
</script>
