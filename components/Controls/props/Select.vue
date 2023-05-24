<template>
  <a-select placeholder="Please select ..." :options="options">
  </a-select>
</template>

<script setup lang='ts'>
const type = defineProp<string>('type')
console.log("🚀 ~ file: Select.vue:8 ~ type:", type)
const options = computed(() => {
  if (type.value === "BaseButtonBtn") {
    return [
      'primary', 'secondary', 'outline', 'dashed', 'text'
    ]
  } else {
    return []
  }
})
</script>
