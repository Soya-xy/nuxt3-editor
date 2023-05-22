import { useEngine } from '~/composables/engine'
import type { Listen } from '~/composables/engine'
import { MouseMoveEvent } from '~/composables/engine/mouse/MouseMoveEvent'

const htmlNode = ref<HTMLElement>()
const engine = useEngine()
const canvas = document.getElementById('NX-Editor') as HTMLElement
function drawLine(id: string) {
  const element = document.getElementById(`#${id}`)
}

function handleDrag(e: MouseEvent) {
  if (!engine.isInEditor) return
  if (!e.target) return
  const target = e.target as HTMLElement
  let previousState = engine.stateId
  const nextState = target.id
  if (nextState !== previousState) {
    engine.stateId = nextState
    drawLine(engine.stateId)
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
    if (htmlDiv && !engine.dragging)
      htmlDiv.style.display = 'none'
  })

  return () => mouseMove.unSubscribe!(handleDrag)
}
