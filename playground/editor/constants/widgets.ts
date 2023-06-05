interface ATTR {
  [key: string]: {
    type: string
    value: string
  }
}
export const ATTR_NAME: ATTR = {
  value: { type: 'input', value: '内容' },
  type: { type: 'select', value: '类型' },
}
