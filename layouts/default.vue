<script setup  lang="ts">
const collapsed = ref(false)
const onCollapse = () => {
  collapsed.value = !collapsed.value
  console.log('🚀 ~ file: default.vue:5 ~ onCollapse ~ collapsed.value:', collapsed.value)
}
</script>

<template>
  <a-layout class="layout-demo">
    <a-layout-header>Header</a-layout-header>
    <a-layout>
      <a-layout-sider hide-trigger collapsible breakpoint="lg" :width="220" :collapsed="collapsed" @collapse="onCollapse">
        <a-menu h-full :default-open-keys="['0']" :default-selected-keys="['0_1']" show-collapse-button>
          <a-menu-item key="0_0_0" data-obj="1">
            Menu 1
          </a-menu-item>
          <a-sub-menu key="0">
            <template #icon>
              <icon-apps />
            </template>
            <template #title>
              Navigation 1
            </template>
            <a-menu-item key="0_0">
              Menu 1
            </a-menu-item>
            <a-menu-item key="0_1">
              Menu 2
            </a-menu-item>
            <a-menu-item key="0_2" disabled>
              Menu 3
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="1">
            <template #icon>
              <icon-bug />
            </template>
            <template #title>
              Navigation 2
            </template>
            <a-menu-item key="1_0">
              Menu 1
            </a-menu-item>
            <a-menu-item key="1_1">
              Menu 2
            </a-menu-item>
            <a-menu-item key="1_2">
              Menu 3
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="2">
            <template #icon>
              <icon-bulb />
            </template>
            <template #title>
              Navigation 3
            </template>
            <a-menu-item-group title="Menu Group 1">
              <a-menu-item key="2_0">
                Menu 1
              </a-menu-item>
              <a-menu-item key="2_1">
                Menu 2
              </a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group title="Menu Group 2">
              <a-menu-item key="2_2">
                Menu 3
              </a-menu-item>
              <a-menu-item key="2_3">
                Menu 4
              </a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px;">
        <a-breadcrumb :style="{ margin: '16px 0' }">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content>
          <slot />
        </a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.layout-demo {
  height: 100vh;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}

.layout-demo :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}

.layout-demo :deep(.arco-layout-sider-light) .logo {
  background: var(--color-fill-2);
}

.layout-demo :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}

.layout-demo :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-text-1);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
</style>
