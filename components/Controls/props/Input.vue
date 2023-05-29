<script setup lang='ts'>
const value = defineProp<string>('value', { default: '' })
const change = defineEmit()
</script>

<template>
  <a-input :model-value="value" @input="change" />
</template>
