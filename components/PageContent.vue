<script setup lang='ts'>
const active = defineProp<string[]>('active', {
  default: [0],
})
const currentTab = computed(() => {
  switch (active.value[0]) {
    case '0':
      return resolveComponent('PageRouter')
    case '1':
      return resolveComponent('Page')
    case '2':
      return resolveComponent('PageTree')
  }
})

watch(() => currentTab.value, (val) => {
  console.log(val)
})
</script>

<template>
  <component :is="currentTab" class="tab" />
</template>
