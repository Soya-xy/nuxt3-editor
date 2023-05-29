import { CloneButton } from './CloneButton'
import { DeleteButton } from './DeleteButton'

export const TOOLBAR_HEIGHT = 20
const BACKGROUND_COLOR = '#1890ff'
const COLOR = '#fff'

export function createHtmlElement() {
  const htmlDiv = document.createElement('div')
  htmlDiv.style.backgroundColor = BACKGROUND_COLOR
  htmlDiv.style.color = COLOR
  htmlDiv.style.borderRadius = '2px'
  htmlDiv.style.cursor = 'pointer'
  htmlDiv.style.position = 'relative'
  htmlDiv.style.display = 'flex'
  htmlDiv.style.alignItems = 'center'
  htmlDiv.style.justifyContent = 'center'
  htmlDiv.style.marginLeft = '2px'
  htmlDiv.style.height = `${TOOLBAR_HEIGHT}px`
  htmlDiv.style.width = `${TOOLBAR_HEIGHT}px`
  htmlDiv.innerHTML = '?'
  return htmlDiv
}

export function RenderToolBar() {
  const htmlDiv = document.createElement('div')
  htmlDiv.style.display = 'flex'
  htmlDiv.style.alignItems = 'center'
  htmlDiv.style.position = 'fixed'
  htmlDiv.style.fontSize = '12px'
  htmlDiv.style.padding = '0px'
  htmlDiv.style.userSelect = 'none'
  htmlDiv.appendChild(CloneButton())
  htmlDiv.appendChild(DeleteButton())
  return htmlDiv
}
