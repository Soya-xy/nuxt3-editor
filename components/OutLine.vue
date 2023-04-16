<script setup lang='ts'>
import { useEngine } from '~/composables/engine'
import type { Listen } from '~/composables/engine'
import { MouseMoveEvent } from '~/composables/engine/mouse/MouseMoveEvent'

const htmlDiv = $ref<HTMLElement>()
const engine = useEngine()
let mouseMove: Listen | undefined
// watchEffect(() => {
//   if (htmlDiv && !engine.dragging)
//     htmlDiv.style.display = 'none'
// })

function handleDrag(e: MouseEvent) {
  const element = getRecentNxElement(e.target as HTMLElement)
  if (element?.id === 'NX-Editor') {
    htmlDiv!.style.display = 'none'
    return
  }
  else {
    htmlDiv!.style.display = 'block'
  }
  const containerRect = document.getElementById('NX-Editor')?.getBoundingClientRect()
  if (element && htmlDiv && containerRect) {
    const rect = element.getBoundingClientRect()
    engine.stateId = element.id
    htmlDiv.style.left = NumToPx(rect.left - containerRect.x)
    htmlDiv.style.top = NumToPx(rect.top - containerRect.y)
    htmlDiv.style.height = NumToPx(rect.height)
    htmlDiv.style.width = NumToPx(rect.width)
    htmlDiv.style.zIndex = (getMaxZIndex(element) + 1).toString()
  }
}

onMounted(() => {
  if (htmlDiv) {
    htmlDiv.style.backgroundColor = 'transparent'
    htmlDiv.style.position = 'fixed'
    htmlDiv.style.border = 'dashed 1px #333'
    htmlDiv.style.pointerEvents = 'none'

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
  <div ref="htmlDiv" />
</template>
