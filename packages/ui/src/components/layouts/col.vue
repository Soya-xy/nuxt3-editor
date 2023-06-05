<script setup lang='ts'>
interface IComponents {
  name?: string
  componentName?: string
  componentId?: string
  parentId?: string
  slots?: Record<string, any>
  props?: Record<string, any>
  children?: IComponents[]
}

defineOptions({
  customOptions: {
    name: '列',
    icon: 'i-mdi:button-cursor',
    emit: {},
    slots: {
      default: [],
    },
  },
})
const nxData = defineProp<IComponents>()
const id = defineProp<string>()
</script>

<template>
  <div>
    <PlaceHolder :id="id" name="列">
      <Render v-if="nxData?.children" :components="nxData.children" />
    </PlaceHolder>
  </div>
</template>
