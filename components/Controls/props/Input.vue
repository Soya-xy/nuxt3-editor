<template>
  <a-input :model-value="value" @input="change"></a-input>
</template>

<script setup lang='ts'>
const value = defineProp('value', { default: '' })
const change = defineEmit()

</script>
