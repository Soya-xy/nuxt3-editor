<script setup lang='ts'>
defineOptions({
  name: '按钮',
  icon: 'i-mdi:button-cursor',
  nxType: 'resource',
})
const d = ref('')
</script>

<template>
  <a-button type="primary" inline-block>
    按钮
  </a-button>
</template>
