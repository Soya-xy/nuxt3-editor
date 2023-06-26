import { readFileSync } from 'node:fs'
import {
  type Node,
} from '@babel/types'
import {
  DEFINE_OPTIONS,
  MagicString,
  parseSFC,
} from '@vue-macros/common'
import { filterMacro } from 'unplugin-vue-define-options/dist/api'

export const ROOT_DIR = 'components'

// 获取节点的起始位置和结束位置
function getNodePos(
  nodes: Node | Node[],
  offset: number,
): [start: number, end: number] {
  if (Array.isArray(nodes))
    return [offset + nodes[0].start!, offset + nodes.slice(-1)[0].end!]
  else return [offset + nodes.start!, offset + nodes.end!]
}

export function getComponentAttr(filePath: string) {
  const code = readFileSync(filePath, 'utf8')
  const sfc = parseSFC(code, filePath)
  if (!sfc.scriptSetup)
    return
  const { scriptSetup, getSetupAst } = sfc
  const setupOffset = scriptSetup.loc.start.offset
  const setupAst = getSetupAst()!

  const nodes = filterMacro(setupAst!.body)
  if (nodes.length === 0)
    return

  else if (nodes.length > 1)
    throw new SyntaxError(`duplicate ${DEFINE_OPTIONS}() call`)

  // const scriptAst = getScriptAst()!
  // if (scriptAst)
  //   checkDefaultExport(scriptAst.body)

  const s = new MagicString(code)

  const [node] = nodes
  const [arg] = node.arguments

  if (arg)
    return s.slice(...getNodePos(arg, setupOffset)).toString()
}
