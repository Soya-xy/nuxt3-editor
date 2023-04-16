function isType<T>(type: string | string[]) {
  return (obj: unknown): obj is T =>
    obj != null
    && (Array.isArray(type) ? type : [type]).some(
      t => getType(obj) === `[object ${t}]`,
    )
}
export function getType(obj: any) {
  return Object.prototype.toString.call(obj)
}
export const isFn = isType<(...args: any[]) => any>([
  'Function',
  'AsyncFunction',
  'GeneratorFunction',
])
export const isWindow = isType<Window>('Window')
export function isHTMLElement(obj: any): obj is HTMLElement {
  return obj?.nodeName || obj?.tagName
}
export const isArr = Array.isArray
export const isPlainObj = isType<object>('Object')
export const isStr = isType<string>('String')
export const isBool = isType<boolean>('Boolean')
export const isNum = isType<number>('Number')
export function isObj(val: unknown): val is object {
  return typeof val === 'object'
}
export const isRegExp = isType<RegExp>('RegExp')
export function isValid(val: any) {
  return val !== null && val !== undefined
}
export function isValidNumber(val: any): val is number {
  return !isNaN(val) && isNum(val)
}

export function NumToPx(num?: number) {
  return `${Math.round(num || 0)}px`
}

export function getMaxZIndex(el: Element, max = 0): number {
  const zIndexStr = window.getComputedStyle(el).zIndex
  let zIndex = max
  if (zIndexStr !== 'auto')
    zIndex = Number(zIndexStr)

  const maxZIndex = Math.max(zIndex, max)
  if (el.parentElement)
    return getMaxZIndex(el.parentElement, maxZIndex)

  else
    return maxZIndex
}
