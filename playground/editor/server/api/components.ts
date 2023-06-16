import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { generateRoute } from '@lc/generated'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  generateRoute(body.name, body.path)
  if (import.meta.env.NODE_ENV === 'development')
    fs.writeFileSync(path.resolve(dirname, '../../constants/save.json'), JSON.stringify(body))

  return { body }
})
