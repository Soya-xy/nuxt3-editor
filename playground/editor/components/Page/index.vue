<script setup lang='ts'>
import { type IComponent } from '~/constants/type'

const components = await import('~/constants/components.json').then(m => m.default as IComponent)

const nxid = useNxId
const customStyle = {
  borderRadius: '6px',
  marginBottom: '18px',
  border: 'none',
  overflow: 'hidden',
  background: '#fff',
}

const defaultActiveKey = ref(Array.from(Object.keys(components), (v, k) => k))
</script>

<template>
  <div v-if="components" flex justify="center" w="full">
    <a-card title="组件" w="98%" mx-auto :bordered="false" :body-style="{ padding: 0 }">
      <a-collapse :default-active-key="defaultActiveKey" :bordered="false">
        <a-collapse-item v-for="(v, key, index) in components" :key="index" :header="key" :style="customStyle">
          <a-row class="grid-demo" :gutter="[12, 12]">
            <a-col v-for="item, idx in v.children" :key="idx" :span="8">
              <div
                :id="nxid()" flex="~ col center" bg="#f0f0f0" px1 py2 rounded-2 text-sm cursor="move"
                :nx-data-component="item?.componentName"
              >
                <i :class="item?.icon" class="text-2xl icon" />
                {{ item?.name }}
              </div>
            </a-col>
          </a-row>
        </a-collapse-item>
      </a-collapse>
    </a-card>
  </div>
</template>

<style>
.arco-collapse-item-content {
  background: #fff;
  padding-right: 0;
  padding-left: 5px;
}
</style>
