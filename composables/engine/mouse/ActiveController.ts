export interface IMouseEventOriginData {
  offsetX: number
  offsetY: number
  clientX: number
  clientY: number
  pageX: number
  pageY: number
  target: EventTarget | null
  view: Window | null
  altKey: boolean
  ctrlKey: boolean
  shiftKey: boolean
}

export interface IMouseEventData extends IMouseEventOriginData {
  topClientX?: number
  topClientY?: number
  topPageX?: number
  topPageY?: number
}
