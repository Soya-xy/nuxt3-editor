import { RenderToolBar, TOOLBAR_HEIGHT } from './ToolBar'
import { useEngine } from '~/composables/engine'
import type { Listen } from '~/composables/engine'
import { MouseMoveEvent } from '~/composables/engine/mouse/MouseMoveEvent'

const htmlNode = ref<HTMLElement>()
const toolNode = ref<HTMLElement>()
const engine = useEngine()
let resizeObserver: ResizeObserver

function drawLine(id: string) {
  const canvas = document.getElementById(EDITOR_ID) as HTMLElement
  const element = getRecentNxElement(document.getElementById(id)!)
  const containerRect = canvas?.getBoundingClientRect()

  if (element && containerRect && htmlNode.value && !engine.dragging && toolNode.value) {
    const rect = element.getBoundingClientRect()
    const zIndex = (getMaxZIndex(element) + 1).toString()
    const left = rect.left - containerRect.x
    const top = rect.top - containerRect.y
    htmlNode.value.style.display = 'block'
    htmlNode.value.style.left = NumToPx(left)
    htmlNode.value.style.top = NumToPx(top)
    htmlNode.value.style.height = NumToPx(rect.height)
    htmlNode.value.style.width = NumToPx(rect.width)
    htmlNode.value.style.zIndex = zIndex

    // 菜单栏
    toolNode.value.style.display = 'flex'
    toolNode.value.style.zIndex = zIndex
    // *2 目前2个菜单
    toolNode.value.style.left = NumToPx(left + rect.width - (TOOLBAR_HEIGHT * 2))
    toolNode.value.style.top = NumToPx(top - TOOLBAR_HEIGHT - 2)

    resizeObserver.observe(element)

    if (canvas.contains(htmlNode.value))
      return
    canvas?.appendChild(htmlNode.value)
    if (canvas?.contains(toolNode.value))
      return
    canvas?.appendChild(toolNode.value)
  }
}

function handleDrag(e: MouseEvent) {
  if (!engine.isInEditor)
    return
  if (!e.target)
    return
  if (engine.nodesById.isWidget)
    return
  if (!engine.nodesById.componentId && htmlNode.value && toolNode.value) {
    htmlNode.value.style.display = 'none'
    toolNode.value.style.display = 'none'
  }
  if (engine.nodesById.componentId)
    drawLine(engine.nodesById.componentId)
}

function refresh() {
  if (engine.nodesById.componentId) {
    drawLine(engine.nodesById.componentId)
  }
  else {
    htmlNode.value?.remove()
    toolNode.value?.remove()
  }
}

export function useActiveOutLine() {
  resizeObserver = new ResizeObserver(refresh)

  const mouseMove: Listen = MouseMoveEvent()
  mouseMove.subscribe(handleDrag)

  const htmlDiv = document.createElement('div')
  htmlDiv.style.backgroundColor = 'transparent'
  htmlDiv.style.position = 'fixed'
  htmlDiv.style.border = 'solid 2px #1890ff'
  htmlDiv.style.pointerEvents = 'none'
  htmlNode.value = htmlDiv

  const toolDiv = RenderToolBar()
  toolNode.value = toolDiv

  watchEffect(() => {
    if (htmlDiv && !engine.isInEditor) {
      htmlDiv.style.display = 'none'
      toolDiv.style.display = 'none'
    }

    if (engine.dragging && engine.nodesById.componentId) {
      htmlDiv.style.display = 'none'
      toolDiv.style.display = 'none'
    }
  })

  return () => mouseMove.unSubscribe!(handleDrag)
}
