<script setup lang='ts'>
const change = defineEmit()
const type = defineProp<string>('type')
const value = defineProp<string>('value')
const options = computed(() => {
  if (type.value === 'BaseButtonBtn') {
    return [
      'primary', 'secondary', 'outline', 'dashed', 'text',
    ]
  }
  else {
    return []
  }
})
</script>

<template>
  <a-select placeholder="Please select ..." :options="options" :default-value="value" @change="change" />
</template>
