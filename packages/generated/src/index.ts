import { IComponents } from "./types";
import { V3 } from "./template/page";
import fs from 'node:fs'
import path from 'node:path'
import {
  generatePath,
  getJSON,
  loopComponent,
} from './utils'


// 监听这个文件
// fs.watchFile(path.resolve(__dirname, WATCH_PATH), (eventType, filename) => {
//   const CODE = JSON.parse(fs.readFileSync(WATCH_PATH).toString())

//   CODE.forEach(async (v: any) => {
//     const d = await generateRoute(v.name, v.path, v.components)
//     console.log("🚀 ~ file: core.test.ts:13 ~ CODE.forEach ~ d:", d)
//   });
// })


export const generateCode = async (name: string, code: IComponents[], routePath: string) => {

  if(code.length === 0){
    fs.writeFileSync(routePath, V3())
    return
  }

  const content = getJSON(code)
  loopComponent(content, (item) => {
    const content = V3(item)
    fs.writeFileSync(routePath, content)
  })

}

export const generateRoute = async (name: string, route: string, code: IComponents[] = []) => {
  if (route.startsWith('/')) {

    const routePath = generatePath(route)

    // if (fs.existsSync(routePath)) {
    //   return '文件已存在'
    // } else {
    const fdPath = routePath.split(path.sep).slice(0, -1).join(path.posix.sep)
    if (!fs.existsSync(fdPath)) {
      fs.mkdirSync(fdPath, {
        recursive: true
      })
    }
    await generateCode(name, code, routePath)
    // }
  }
}
