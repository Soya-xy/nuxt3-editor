import { useEngine } from '~/composables/engine'
import type { Listen } from '~/composables/engine'
import { MouseMoveEvent } from '~/composables/engine/mouse/MouseMoveEvent'

const htmlNode = ref<HTMLElement>()
const engine = useEngine()
function handleDrag(e: MouseEvent) {
  if (engine.dragging && htmlNode.value) {
    engine.currentEvent = {
      type: 'drag:move',
      data: e,
    }
    let nodeId = ''
    // if (engine.nodesById.haveSlots) {
    // nodeId = `#${engine.stateId} [name=${engine.nodesById.haveSlots}]`
    // } else {
    nodeId = '#' + engine.stateId
    // }
    if (nodeId === '#' || !engine.stateId) return
    const { width, height, x: rectX, y: rectY, oLeft, oTop } = getTopRect(nodeId)!
    const { x, y } = e
    let position = ''
    if (!width && !height) return
    if (x - rectX < width / 2) {
      position = 'left'
    } else {
      position = 'right'
    }

    if (y - rectY < height / 10) {
      position = 'top'
    } else if (y - rectY > height - (height / 9)) {
      position = 'bottom'
    }


    const container = document.getElementById(engine.stateId)
    if (!container?.contains(htmlNode.value)) {
      container?.appendChild(htmlNode.value)
    }

    htmlNode.value.style.display = 'block'
    htmlNode.value.style.left = NumToPx(oLeft)
    htmlNode.value.style.top = NumToPx(oTop)
    if (position === 'right') {
      htmlNode.value.style.left = NumToPx(oLeft + width)
    }
    if (position === 'bottom') {
      htmlNode.value.style.top = NumToPx(oTop + height)
    }
    if (['left', 'right'].includes(position)) {
      htmlNode.value.style.width = NumToPx(2)
      htmlNode.value.style.height = NumToPx(height)
    } else {
      htmlNode.value.style.width = NumToPx(width)
      htmlNode.value.style.height = NumToPx(2)
    }
    htmlNode.value.style.backgroundColor = 'red'
  }
}


export function useInsertion() {
  let mouseMove: Listen
  mouseMove = MouseMoveEvent()
  mouseMove.subscribe(handleDrag)

  const htmlCursorNode = document.createElement('div')
  htmlCursorNode.style.position = "fixed"
  htmlCursorNode.style.display = "none"
  htmlCursorNode.style.pointerEvents = "none"
  htmlNode.value = htmlCursorNode

  watchEffect(() => {
    if (htmlCursorNode && !engine.dragging)
      htmlCursorNode.style.display = 'none'
  })

  return () => mouseMove.unSubscribe!(handleDrag)
}
