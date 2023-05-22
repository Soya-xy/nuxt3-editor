import { useEngine } from '~/composables/engine'
import type { Listen } from '~/composables/engine'
import { MouseMoveEvent } from '~/composables/engine/mouse/MouseMoveEvent'

const htmlNode = ref<HTMLElement>()
const engine = useEngine()
function drawLine(id: string) {
  const canvas = document.getElementById('NX-Editor') as HTMLElement
  const element = getRecentNxElement(document.getElementById(id)!)
  const containerRect = canvas?.getBoundingClientRect()

  if (element && containerRect && htmlNode.value && !engine.dragging) {
    const rect = element.getBoundingClientRect();
    htmlNode.value.style.display = 'block'
    htmlNode.value.style.left = NumToPx(rect.left - containerRect.x)
    htmlNode.value.style.top = NumToPx(rect.top - containerRect.y)
    htmlNode.value.style.height = NumToPx(rect.height)
    htmlNode.value.style.width = NumToPx(rect.width)
    htmlNode.value.style.zIndex = (getMaxZIndex(element) + 1).toString()
    if (canvas.contains(htmlNode.value)) return
    canvas?.appendChild(htmlNode.value)
  }
}

function handleDrag(e: MouseEvent) {
  if (!engine.isInEditor) return
  if (!e.target) return
  if (engine.nodesById.isWidget) return
  if (!engine.nodesById.componentId && htmlNode.value) {
    htmlNode.value.style.display = 'none'
  }
  if (engine.nodesById.componentId) {
    drawLine(engine.nodesById.componentId)
  }
}


export function useActiveOutLine() {
  let mouseMove: Listen
  mouseMove = MouseMoveEvent()
  mouseMove.subscribe(handleDrag)

  const htmlDiv = document.createElement('div')
  htmlDiv.style.backgroundColor = "transparent"
  htmlDiv.style.position = "fixed"
  htmlDiv.style.border = `solid 2px #1890ff`
  htmlDiv.style.pointerEvents = "none"

  htmlNode.value = htmlDiv

  watchEffect(() => {
    if (htmlDiv && !engine.isInEditor)
      htmlDiv.style.display = 'none'

    if (engine.dragging && engine.nodesById.componentId) {
      htmlDiv.style.display = 'none'
    }
  })

  return () => mouseMove.unSubscribe!(handleDrag)
}
