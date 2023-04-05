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
    engine.currentEvent = {
      type: 'drag:start',
      data: e,
    }
    engine.dragging = true
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
    if (e.button !== 0 || e.ctrlKey || e.metaKey)
      return

    if (
      (e.target as any).isContentEditable
      || (e.target as any).contentEditable === 'true'
    )
      return true

    if ((e.target as any)?.closest?.('.monaco-editor'))
      return

    // 判断e.target的id是否是nx开头
    if (!(e.target as any)?.id?.startsWith?.('nx'))
      return

    startEvent = e
    engine.dragging = false
    onMouseDownAt = Date.now()
    dom?.addEventListener('mousemove', onMouseMove)
  }

  function onMouseUp(e: MouseEvent) {
    if (engine.dragging) {
      engine.currentEvent = {
        type: 'drag:stop',
        data: e,
      }
    }

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
