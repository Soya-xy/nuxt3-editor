import { useEngine } from '..'

export function MouseMoveEvent() {
  const engine = useEngine()
  const dom = document.getElementById('actionArea')

  function payload(e: MouseEvent) {
    console.log('MouseMoveEvent', e)
    engine.dispatch({
      type: 'mouse:move',
      payload: () => {
        console.log('IEvent', e)
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
