import { useEngine } from '~/composables/engine'
import type { Listen } from '~/composables/engine'
import { MouseMoveEvent } from '~/composables/engine/mouse/MouseMoveEvent'

const htmlNode = ref<HTMLElement>()
const engine = useEngine()
function drawLine(id: string) {
  const canvas = document.getElementById(EDITOR_ID) as HTMLElement
  const element = getRecentNxElement(document.getElementById(id)!)
  const containerRect = canvas?.getBoundingClientRect()

  if (element && containerRect && htmlNode.value) {
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
  const target = e.target as HTMLElement
  let previousState = engine.stateId
  const nextState = (getRecentNxElement(target) as HTMLElement)?.id
  if (!nextState && htmlNode.value) {
    htmlNode.value.style.display = 'none'
  }
  if (nextState !== previousState) {
    engine.stateId = nextState
    drawLine(nextState)
  }
}


export function useOutLine() {
  let mouseMove: Listen
  mouseMove = MouseMoveEvent()
  mouseMove.subscribe(handleDrag)

  const htmlDiv = document.createElement('div')
  htmlDiv.style.backgroundColor = "transparent"
  htmlDiv.style.position = "fixed"
  htmlDiv.style.border = `dashed 1px #1890ff`
  htmlDiv.style.pointerEvents = "none"

  htmlNode.value = htmlDiv

  watchEffect(() => {
    if (htmlDiv && !engine.isInEditor)
      htmlDiv.style.display = 'none'
  })

  return () => mouseMove.unSubscribe!(handleDrag)
}
