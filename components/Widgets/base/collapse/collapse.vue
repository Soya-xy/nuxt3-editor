<script setup lang='ts'>
defineOptions({
  customOptions: {
    name: '折叠面板',
    icon: 'i-mdi:button-cursor',
  },
})
</script>

<template>
  <a-collapse :default-active-key="['1', 2]">
    <a-collapse-item key="1" header="Beijing Toutiao Technology Co., Ltd.">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </a-collapse-item>
    <a-collapse-item :key="2" header="Beijing Toutiao Technology Co., Ltd.">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </a-collapse-item>
    <a-collapse-item key="3" header="Beijing Toutiao Technology Co., Ltd.">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </a-collapse-item>
  </a-collapse>
</template>
