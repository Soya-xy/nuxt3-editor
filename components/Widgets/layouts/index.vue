<script setup lang="ts">
defineOptions({
  name: '上中下布局',
  icon: 'i-mdi:button-cursor',
  nxType: 'resource',
  slots: 'header|content|footer',
})
</script>

<template>
  <a-layout h-full bg-cool-gray>
    <a-layout-header slot-name="header">
      <slot name="header">
        <div class="border">
          头部区
        </div>
      </slot>
    </a-layout-header>
    <a-layout-content slot-name="content">
      <slot name="content">
        <div class="border">
          内容区
        </div>
      </slot>
    </a-layout-content>
    <a-layout-footer slot-name="footer">
      <slot name="footer">
        <div class="border">
          底部区
        </div>
      </slot>
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.border {
  padding: 8px;
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
</style>
