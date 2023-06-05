import { IComponents } from "./types";
import { V3 } from "./template/page";
import * as fg from 'fast-glob'
import fs from 'node:fs'
import path from 'node:path'


const COMPONENT_PATH = path.resolve(__dirname, '../../../playground/editor/components/Widgets/**/*.vue')
const GENERATE_ROUTE_PATH = path.resolve(__dirname, '../../../packages/preview/src/pages')
const WATCH_PATH = path.resolve(__dirname, '../../../playground/editor/constants/save.json')


// 监听这个文件
fs.watchFile(path.resolve(__dirname, WATCH_PATH), (eventType, filename) => {
  const CODE = JSON.parse(fs.readFileSync(WATCH_PATH).toString())

  CODE.forEach(async (v: any) => {
    const d = await generateRoute(v.name, v.path, v.components)
    console.log("🚀 ~ file: core.test.ts:13 ~ CODE.forEach ~ d:", d)
  });
})


export const generateCode = async (name: string, code: IComponents[]) => {

  // const entries = await fg([COMPONENT_PATH]);
  // console.log("🚀 ~ file: index.ts:6 ~ generateCode ~ entries:", entries)
  return V3
}

export const generateRoute = async (name: string, route: string, code: IComponents[]) => {
  if (route.startsWith('/')) {

    const routePath = path.resolve(GENERATE_ROUTE_PATH, `.${route.replace('/', path.sep)}.vue`)

    // if (fs.existsSync(routePath)) {
    //   return '文件已存在'
    // } else {
    const fdPath = routePath.split(path.sep).slice(0, -1).join(path.posix.sep)
    console.log("🚀 ~ file: index.ts:41 ~ generateRoute ~ fdPath:", fdPath)
    if (!fs.existsSync(fdPath)) {
      fs.mkdirSync(fdPath,{
        recursive: true
      })
    }
    const content = await generateCode(name, code)
    fs.writeFileSync(routePath, content)
    // }
  }
}
