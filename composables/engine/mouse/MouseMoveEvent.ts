import { useEngine } from '..'

export function MouseMoveEvent() {
  const engine = useEngine()
  const dom = document.getElementById('actionArea')

  function payload(e: MouseEvent) {
    engine.dispatch({
      type: 'mouse:move',
      payload: () => {
      },
    })
  }

  function subscribe() {
    dom?.addEventListener('mousemove', payload)
  }

  function unSubscribe() {
    dom?.removeEventListener('mousemove', payload)
  }
  return {
    type: 'mouse:move',
    subscribe,
    unSubscribe,
  }
}
