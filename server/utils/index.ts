import { parse } from 'node:path'
import { readFileSync } from 'node:fs'
import { slash } from '@antfu/utils'
import _ from 'lodash'
import {
  type Node,
} from '@babel/types'
import {
  DEFINE_OPTIONS,
  MagicString,
  parseSFC,
} from '@vue-macros/common'
import { checkDefaultExport, filterMacro } from 'unplugin-vue-define-options/api'

export const ROOT_DIR = 'components'
export const COMPONENT_DIR = '/Widgets'
function getNodePos(
  nodes: Node | Node[],
  offset: number,
): [start: number, end: number] {
  if (Array.isArray(nodes))
    return [offset + nodes[0].start!, offset + nodes.slice(-1)[0].end!]
  else return [offset + nodes.start!, offset + nodes.end!]
}

function getComponentAttr(filePath: string): string {
  const code = readFileSync(filePath, 'utf8')
  const sfc = parseSFC(code, filePath)
  if (!sfc.scriptSetup)
    return '{}'
  const { scriptSetup, getSetupAst, getScriptAst } = sfc
  const setupOffset = scriptSetup.loc.start.offset
  const setupAst = getSetupAst()!

  const nodes = filterMacro(setupAst!.body)
  if (nodes.length === 0)
    return '{}'

  else if (nodes.length > 1)
    throw new SyntaxError(`duplicate ${DEFINE_OPTIONS}() call`)

  const scriptAst = getScriptAst()!
  if (scriptAst)
    checkDefaultExport(scriptAst.body)

  const s = new MagicString(code)

  const [node] = nodes
  const [arg] = node.arguments
  if (arg)
    return s.slice(...getNodePos(arg, setupOffset)).toString()

  else return '{}'
}

export function getComponentName(filePath: string) {
  const root = process.cwd()
  const resolvedDirs = [slash(`${root}/${ROOT_DIR}`)]
  const parsedFilePath = parse(slash(filePath))

  let strippedPath = ''

  // remove include directories from filepath
  for (const dir of resolvedDirs) {
    if (parsedFilePath.dir.startsWith(dir)) {
      strippedPath = parsedFilePath.dir.slice(dir.length)
      break
    }
  }

  let folders = strippedPath.slice(1).split('/').filter(Boolean)
  let filename = parsedFilePath.name
  folders = folders.map(f => f.replace(/[^a-zA-Z0-9\-]/g, ''))
  if (filename.toLowerCase() === 'index')
    filename = ''
  if (!_.isEmpty(folders)) {
    const namespaced = [...folders, filename]
    filename = namespaced.filter(Boolean).join('-')
  }

  return { name: pascalCase(filename), attrs: getComponentAttr(filePath) }
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export function pascalCase(str: string) {
  return capitalize(camelCase(str))
}
export function camelCase(str: string) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}
