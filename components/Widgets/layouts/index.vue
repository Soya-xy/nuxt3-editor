<script setup lang="ts">
defineOptions({
  name: '栅格布局',
  icon: 'i-mdi:button-cursor',
  nxType: 'resource',
  slots: 'header|content|footer',
})
const id = defineProp('id')
const nxData = defineProp<any>('nxData')
// const slots = computed(() => useSlots())
const children = computed(() => {
  let obj: any = {}
  nxData.value?.children?.forEach((item: any) => {
    if (Array.isArray(obj[item.slots])) {
      obj[item.slots].push(item)
    } else {
      obj[item.slots] = [item]
    }
  })
  return obj
})
watchEffect(() => {
  console.log(children.value);

})
</script>

<template>
  <a-layout wh-full>
    <a-layout-header>
      <slot name="header">
        <drop-tips :parentId="id" slotName="header">
          <Render v-if="children.header" :components="children.header"></Render>
        </drop-tips>
      </slot>
    </a-layout-header>
    <a-layout-content mt1 mb2>
      <slot name="content">
        <drop-tips :parentId="id" slotName="content">
          <Render v-if="children.content" :components="children.content"></Render>
        </drop-tips>
      </slot>
    </a-layout-content>
    <a-layout-footer>
      <slot name="footer">
        <drop-tips :parentId="id" slotName="footer">
          <Render v-if="children.footer" :components="children.footer"></Render>
        </drop-tips>
      </slot>
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.border {
  /* padding: 8px; */
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  flex: 1 1 0%;
  background-color: rgb(240, 240, 240);
  color: rgba(0, 0, 0, 0.88);
  border: 1px dashed;
}

:deep(.arco-layout-footer) {
  flex: 1;
}

:deep(.arco-layout-header) {
  line-height: unset !important;
  height: auto !important;
  background:none !important;
  border: none !important;
}
</style>
