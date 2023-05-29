<script setup lang='ts'>
import { useEngine } from '~/composables/engine'
import type { Listen } from '~/composables/engine'
import { MouseMoveEvent } from '~/composables/engine/mouse/MouseMoveEvent'

const htmlNode = ref<HTMLElement>()
const engine = useEngine()
let mouseMove: Listen | undefined
watchEffect(() => {
  if (htmlNode.value && !engine.dragging)
    htmlNode.value.style.display = 'none'
})

function handleDrag(e: MouseEvent) {
  if (engine.dragging && htmlNode.value && engine.draggingNodes?.name) {
    engine.currentEvent = {
      type: 'drag:move',
      data: e,
    }
    htmlNode.value.style.display = 'block'

    htmlNode.value.innerHTML = engine.draggingNodes?.name || ''
    htmlNode.value.style.left = NumToPx(engine.targetEvent?.topClientX)
    htmlNode.value.style.top = NumToPx(engine.targetEvent?.topClientY)
  }
}

onMounted(() => {
  if (htmlNode.value) {
    htmlNode.value.style.backgroundColor = 'blue'
    htmlNode.value.style.position = 'fixed'
    htmlNode.value.style.display = 'none'
    htmlNode.value.style.color = '#fff'
    htmlNode.value.style.fontSize = '13px'
    htmlNode.value.style.padding = '4px 8px'
    htmlNode.value.style.pointerEvents = 'none'
    htmlNode.value.style.whiteSpace = 'nowrap'
    htmlNode.value.style.zIndex = '10000'
    mouseMove = MouseMoveEvent()
    mouseMove.subscribe(handleDrag)
  }
})

onUnmounted(() => {
  if (mouseMove)
    mouseMove.unSubscribe!(handleDrag)
})
</script>

<template>
  <div ref="htmlNode" />
</template>
