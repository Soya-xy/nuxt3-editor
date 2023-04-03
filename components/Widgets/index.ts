const modules = import.meta.glob('./**/*/index.(tsx|vue)', {
  import: 'default',
  eager: true,
})

const components: Record<string, any> = {}

console.log(modules, '起航')

for (const path in modules) {
  let type = path.split('/')[1]
  const name = path.split('/')[2]
  switch (type) {
    case 'base':
      type = '基础组件'
      break
  }
  if (components[type]?.children) {
    components[type].children.push(modules[path])
  }
  else {
    components[type] = {
      children: [modules[path]],
    }
  }
}
console.log('🚀 ~ file: index.ts:27 ~ components:', components)

export default components
