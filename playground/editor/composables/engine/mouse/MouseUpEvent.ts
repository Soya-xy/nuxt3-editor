import { useEngine } from '..'

export function MouseUpEvent() {
  const engine = useEngine()
  const dom = document.getElementById('actionArea')

  function payload(e: MouseEvent) {
    engine.dispatch({
      type: 'mouse:up',
      payload: () => {
        console.log('IEvent', e)
      },
    })
  }

  function subscribe() {
    dom?.addEventListener('mouseup', payload)
  }

  function unSubscribe() {
    dom?.removeEventListener('mouseup', payload)
  }
  return {
    type: 'mouse:up',
    subscribe,
    unSubscribe,
  }
}
