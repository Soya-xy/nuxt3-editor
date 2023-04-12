<script setup lang='ts'>
import { useEngine } from '~/composables/engine'
import type { Listen } from '~/composables/engine'
import { MouseMoveEvent } from '~/composables/engine/mouse/MouseMoveEvent'

const htmlNode = $ref<HTMLElement>()
const engine = useEngine()
let mouseMove: Listen | undefined
watchEffect(() => {
  if (htmlNode && !engine.dragging)
    htmlNode.style.display = 'none'
})

function handleDrag(e: MouseEvent) {
  if (engine.dragging && htmlNode) {
    engine.currentEvent = {
      type: 'drag:move',
      data: e,
    }
    htmlNode.style.display = 'block'

    htmlNode.innerHTML = engine.nodesById!.title
    htmlNode.style.left = NumToPx(engine.targetEvent?.topClientX)
    htmlNode.style.top = NumToPx(engine.targetEvent?.topClientY)
  }
}

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
