<script setup lang='ts'>
const customStyle = {
  borderRadius: '6px',
  marginBottom: '18px',
  border: 'none',
  overflow: 'hidden',
  background: '#fff',
}

const componentList = $ref([{
  title: '基础组件',
  children: [{
    name: '按钮',
    icon: 'i-mdi:button-cursor',
  }, {
    name: '按钮',
    icon: 'i-mdi:button-cursor',
  }, {
    name: '按钮',
    icon: 'i-mdi:button-cursor',
  }, {
    name: '按钮',
    icon: 'i-mdi:button-cursor',
  }],
}, {
  title: '设计组件',
  children: [{
    name: '按钮',
    icon: 'i-mdi:button-cursor',
  }],
}])

const defaultActiveKey = ref(Array.from(componentList, (v, k) => k))
</script>

<template>
  <div flex justify="center" w="full">
    <a-card title="组件" w="98%" mx-auto :bordered="false" :body-style="{ padding: 0 }">
      <a-collapse :default-active-key="defaultActiveKey" :bordered="false">
        <a-collapse-item v-for="v, k in componentList" :key="k" header="基础组件" :style="customStyle">
          <a-row class="grid-demo" :gutter="[12, 12]">
            <a-col v-for="item, index in v.children" :key="index" :span="8">
              <div flex="~ col center" bg="#f0f0f0" px1 py2 rounded-2 text-sm>
                <i :class="`${item.icon}`" class="text-2xl icon-btn" />
                组件组{{ item.name }}
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
