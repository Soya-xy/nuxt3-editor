import { generateCode, generateRoute } from '../src';
import { describe, test } from 'vitest'
import '../src'
const CODE = [
  {
    "name": "works",
    "path": "/work",
    "components": [{ "componentName": "LayoutsCol", "componentId": "editor-nx-7", "parentId": "NX-Editor", "name": "列", "icon": "i-mdi:button-cursor", "emit": {}, "slots": { "default": [] } }, { "componentName": "BaseButtonBtn", "componentId": "editor-nx-8", "parentId": "editor-nx-7", "name": "按钮", "icon": "i-mdi:button-cursor", "props": { "value": "测试", "type": "outline" } }, { "componentName": "BaseCarousel", "componentId": "editor-nx-9", "parentId": "NX-Editor", "name": "轮播图", "icon": "i-carbon:3d-cursor", "props": { "images": ["https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp", "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp", "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp"] } }, { "componentName": "BaseCards", "componentId": "editor-nx-10", "parentId": "editor-nx-7", "name": "卡片", "icon": "i-carbon:3d-cursor" }, { "componentName": "LayoutsRow", "componentId": "editor-nx-11", "parentId": "editor-nx-7", "name": "行", "icon": "i-mdi:button-cursor", "emit": {}, "slots": { "default": [] } }, { "componentName": "BaseCarousel", "componentId": "editor-nx-12", "parentId": "editor-nx-11", "name": "轮播图", "icon": "i-carbon:3d-cursor", "props": { "images": ["https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp", "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp", "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp"] } }, { "componentName": "BaseButtonBtn", "componentId": "editor-nx-13", "parentId": "NX-Editor", "name": "按钮", "icon": "i-mdi:button-cursor", "props": { "value": "测试", "type": "outline" } }]
  }]
describe('core', () => {
  test('generateCode', async () => {
    CODE.forEach(async (v) => {
      const d = await generateRoute(v.name, v.path, v.components)
      console.log("🚀 ~ file: core.test.ts:13 ~ CODE.forEach ~ d:", d)
    });
  })
})
