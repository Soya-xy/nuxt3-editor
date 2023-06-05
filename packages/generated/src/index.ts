import { IComponents } from "./types";
import { V3 } from "./template/page";
import fg from 'fast-glob'
import fs from 'node:fs'

const COMPONENT_PATH = 'playground/editor/components/Widgets/**/*.vue'
const GENERATE_ROUTE_PATH = 'packages/preview/src/pages'
export const generateCode = async (code: IComponents[]) => {
  const entries = await fg([COMPONENT_PATH]);
  console.log("🚀 ~ file: index.ts:6 ~ generateCode ~ entries:", entries)
}

export const generateRoute = async (name: string, route: string) => {
  const path = route.split('/').filter((v) => v !== '');
  if (path.length === 0) return
  if (path.length === 1) {
    const routePath = `${GENERATE_ROUTE_PATH}/${name}.vue`
    const content = V3
    fs.writeFileSync(routePath, content)
  }
  if (path.length > 1) {
    path.forEach(async (v, i) => {
      // 在使用fs创建文件
      // fs.mkdirSync(`${GENERATE_ROUTE_PATH}/${path.slice(0, i + 1).join('/')}`)
    })
  }
}
