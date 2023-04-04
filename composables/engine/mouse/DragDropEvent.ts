import { useEngine } from '..'

export function DragDropEvent() {
  const engine = useEngine()
  const dom = document.getElementById('actionArea')
  // 起始位置
  let startEvent: MouseEvent | null = null
  let onMouseDownAt = 0
  function payload(e: MouseEvent) {
    engine.dispatch({
      type: 'drag:start',
      payload: () => {
        // console.log('IEvent', e)
      },
    })
  }

  function onStartDrag(e: MouseEvent) {
    if (engine.dragging)
      return
    engine.dragging = true
    console.log('🚀 ~ file: DragDropEvent.ts:19 ~ onStartDrag ~ e:', e)
  }

  function onMouseMove(e: MouseEvent) {
    if (!startEvent)
      return
    const distance = Math.sqrt(
      (e.pageX - startEvent.pageX) ** 2
        + (e.pageY - startEvent.pageY) ** 2,
    )
    const timeDelta = Date.now() - onMouseDownAt
    if (timeDelta > 10 && distance > 4 && e !== startEvent) {
      dom?.removeEventListener('mousemove', onMouseMove)
      onStartDrag(e)
    }
  }

  function onMouseDown(e: MouseEvent) {
    console.log('🚀 ~ file: DragDropEvent.ts:22 ~ onMouseDown ~ e:', e)
    if (e.button !== 0 || e.ctrlKey || e.metaKey)
      return

    if (
      (e.target as any).isContentEditable
      || (e.target as any).contentEditable === 'true'
    )
      return true

    if ((e.target as any)?.closest?.('.monaco-editor'))
      return
    startEvent = e
    engine.dragging = false
    onMouseDownAt = Date.now()
    dom?.addEventListener('mousemove', onMouseMove)
  }

  function onMouseUp(e: MouseEvent) {
    if (engine.dragging)
      console.log(e)
    dom?.removeEventListener('mousemove', onMouseMove)
    engine.dragging = false
  }

  function subscribe() {
    dom?.addEventListener('mouseup', onMouseUp)
    dom?.addEventListener('mousedown', onMouseDown)
    dom?.addEventListener('dragend', payload)
    dom?.addEventListener('dragstart', onStartDrag)
  }

  function unSubscribe() {
    dom?.removeEventListener('mousedown', onMouseDown)
    dom?.removeEventListener('dragend', payload)
    dom?.removeEventListener('dragstart', onStartDrag)
  }
  return {
    type: 'drag:start',
    subscribe,
    unSubscribe,
  }
}
