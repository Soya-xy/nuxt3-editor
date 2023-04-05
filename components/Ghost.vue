<script setup lang='ts'>
import { useEngine } from '~/composables/engine'

const htmlNode = $ref<HTMLElement>()
const engine = useEngine()

watchEffect(() => {
  if (htmlNode) {
    if (engine.dragging) {
      htmlNode.style.display = 'block'
      htmlNode.style.display = 'block'
      htmlNode.innerHTML = '123'
      htmlNode.style.left = NumToPx(engine.targetEvent?.topClientX)
      htmlNode.style.top = NumToPx(engine.targetEvent?.topClientY)
    }

    else { htmlNode.style.display = 'none' }
  }
})

onMounted(() => {
  if (htmlNode) {
    htmlNode.style.backgroundColor = 'blue'
    htmlNode.style.position = 'fixed'
    htmlNode.style.display = 'none'
    htmlNode.style.color = '#fff'
    htmlNode.style.fontSize = '13px'
    htmlNode.style.padding = '4px 8px'
    htmlNode.style.pointerEvents = 'none'
    htmlNode.style.whiteSpace = 'nowrap'
    htmlNode.style.zIndex = '10000'
  }
})
</script>

<template>
  <div ref="htmlNode" />
</template>
