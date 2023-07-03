import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

async function getData(saveData: any, item: any) {
  const result = []
  for (const itemData of item.data) {
    const data = saveData[itemData]
    if (data.type === 'view') {
      for (const it of data.data) {
        const is = saveData[it.id]
        if (is.source === 'api') {
          result.push({
            [it.alias]: await $fetch(is.url, {
              method: 'POST',
              body: is.params,
            }),
          })
        }
      }
    }
    else if (data.type === 'data') {
      result.push({ [data.alias]: data.data })
    }
  }
  console.log('🚀 ~ file: pre-data.ts:25 ~ getData ~ result:', result)

  return result
}
export default defineNitroPlugin(async () => {
  const save = path.resolve(dirname, '../../constants/save.json')
  const components = path.resolve(dirname, '../../constants/data.json')
  const saveString = fs.readFileSync(save, 'utf8')
  const componentsString = fs.readFileSync(components, 'utf8')
  const saveData = JSON.parse(saveString)
  const componentsData = JSON.parse(componentsString)

  for (const item of componentsData) {
    if (Array.isArray(item.data) && item.data.length > 0)
      item.data = await getData(saveData, item)
  }

  console.log(JSON.stringify(componentsData))

  // 将componentsData结果写入文是件
  // fs.writeFileSync(components, JSON.stringify(componentsData), 'utf8')
})
