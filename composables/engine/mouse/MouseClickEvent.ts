import { useEngine } from '..'

export function MouseClickEvent() {
  const engine = useEngine()
  const dom = document.getElementById('actionArea')

  function payload(e: MouseEvent) {
    engine.dispatch({
      type: 'mouse:click',
      payload: () => {
        // console.log('IEvent', e)
      },
    })
  }

  function subscribe() {
    dom?.addEventListener('click', payload)
  }

  function unSubscribe() {
    dom?.removeEventListener('click', payload)
  }
  return {
    type: 'mouse:click',
    subscribe,
    unSubscribe,
  }
}
