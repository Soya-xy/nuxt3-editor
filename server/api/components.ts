import fg from 'fast-glob'
import _ from 'lodash'
import { COMPONENT_DIR, ROOT_DIR } from '../utils'

export default defineEventHandler(() => {
  const files = fg.sync(`${ROOT_DIR}${COMPONENT_DIR}/**/*.vue`, {
    ignore: ['node_modules'],
    onlyFiles: true,
    cwd: process.cwd(),
    absolute: true,
  })
  return _.toArray(files).map(p => getComponentName(p))
})
