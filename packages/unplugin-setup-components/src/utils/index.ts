import { readFileSync } from 'node:fs'
import { posix, resolve } from 'node:path'
import {
  type CallExpression,
  type Node,
  type Statement,
} from '@babel/types'
import { parse } from 'vue/compiler-sfc'
import { babelParse, isCallOf } from 'ast-kit'
import { MagicString } from 'magic-string-ast'

export const ROOT_DIR = 'components'
export const COMPONENT_DIR = '/Widgets'
const DEFINE_OPTIONS = 'defineOptions'

export function parseSFC(code: string) {
  const sfc = parse(code)
  const { descriptor, errors } = sfc

  const scriptLang = sfc.descriptor.script?.lang
  const scriptSetupLang = sfc.descriptor.scriptSetup?.lang

  if (
    sfc.descriptor.script
    && sfc.descriptor.scriptSetup
    && (scriptLang || 'js') !== (scriptSetupLang || 'js')
  ) {
    throw new Error(
      '[unplugin-vue-macros] <script> and <script setup> must have the same language type.',
    )
  }

  const lang = scriptLang || scriptSetupLang

  return {
    sfc,
    ...descriptor,
    lang,
    errors,
    getSetupAst() {
      if (!descriptor.scriptSetup)
        return
      return babelParse(descriptor.scriptSetup.content, lang)
    },
    getScriptAst() {
      if (!descriptor.script)
        return
      return babelParse(descriptor.script.content, lang)
    },
  }
}

export function filterMacro(stmts: Statement[]) {
  return stmts
    .map((raw: Node) => {
      let node = raw
      if (raw.type === 'ExpressionStatement')
        node = raw.expression
      return isCallOf(node, DEFINE_OPTIONS) ? node : undefined
    })
    .filter((node): node is CallExpression => !!node)
}
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
  const sfc = parseSFC(code)

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

  const s = new MagicString(code)

  const [node] = nodes
  const [arg] = node.arguments

  if (arg)
    return s.slice(...getNodePos(arg, setupOffset)).toString()
}

export function getComponentName(file: string) {
  const nameArr = file.split(posix.sep)
  let name = ''
  nameArr.forEach((item, key) => {
    if (item.endsWith('.vue') && item !== 'index.vue') {
      item = item.replace('.vue', '')
      name += item.charAt(0).toUpperCase() + item.slice(1)
    }
    else if (key !== nameArr.length - 1) {
      name += item.charAt(0).toUpperCase() + item.slice(1)
    }
  })
  return name
}

export async function parseComponent(filename: string, root: string, path: string) {
  // 获取当前目录
  const pathDir = resolve(root, path)
  const options = {
    filename,
    resolver: {
      basedir: root,
      paths: [pathDir],
    },
  }
  const { parseComponent: pC } = await import('@webfansplz/vuedoc-parser')

  return await pC(options)
}
