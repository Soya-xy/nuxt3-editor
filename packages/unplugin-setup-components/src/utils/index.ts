import { resolve } from 'node:path'

export function toHump(name: string) {
  return name.replace(/(^|-)(\w)/g, (match, p1, p2) => p2.toUpperCase())
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
