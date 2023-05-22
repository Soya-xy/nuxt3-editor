<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang='ts'>
defineOptions({
  name: '列',
  icon: 'i-mdi:button-cursor',
  nxType: 'resource',
})
</script>
