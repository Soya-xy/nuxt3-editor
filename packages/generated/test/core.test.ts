import { generateCode, generateRoute } from '../src';
import { describe } from 'vitest'
const CODE = [
  {
    "name": "work", "path": "/work",
    "components": [{ "componentName": "BaseButtonBtn", "componentId": "editor-nx-13", "parentId": "NX-Editor", "name": "按钮", "icon": "i-mdi:button-cursor", "props": { "value": "测试", "type": "outline" } }, { "componentName": "BaseCards", "componentId": "editor-nx-14", "parentId": "NX-Editor", "name": "卡片", "icon": "i-carbon:3d-cursor" }]
  }
]
describe('fixtures', async () => {
  CODE.forEach(async (v) => {
    await generateRoute(v.name, v.path)
  });
})
