import { generateCode } from '@lc/generated'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const lc = generateCode(body)
  console.log('🚀 ~ file: components.ts:6 ~ defineEventHandler ~ lc:', lc)
  return { body }
})
