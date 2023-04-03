<script setup lang="ts">
const collapsed = ref(false)
const menuActive = ref(['0'])
const onCollapse = () => {
  collapsed.value = !collapsed.value
}
watch(() => menuActive.value, (val) => {
  console.log(val)
})
</script>

<template>
  <a-layout class="layout-demo">
    <a-layout-header>Header</a-layout-header>
    <a-layout>
      <a-layout-sider hide-trigger breakpoint="lg" :width="220" :collapsed="true">
        <a-menu
          v-model:selected-keys="menuActive" h-full
          :default-selected-keys="['0']"
          @collapse="onCollapse"
        >
          <a-menu-item key="0">
            <template #icon>
              <IconBug />
            </template>
            Bugs
          </a-menu-item>
          <a-menu-item key="1">
            <template #icon>
              <IconBug />
            </template>
            Bug
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-sider hide-trigger breakpoint="lg" :width="260" :collapsed-width="0" :collapsed="collapsed" border-l>
        <div flex>
          <main v-show="!collapsed">
            <PageContent :active="menuActive" />
          </main>
          <button class="toggle-button" @click="onCollapse">
            <IconLeft v-if="collapsed" />
            <IconRight v-else />
          </button>
        </div>
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
.toggle-button {
  align-items: center;
  border: 1px solid;
  cursor: pointer;
  display: flex;
  font-size: 10px;
  height: 30px;
  justify-content: center;
  position: absolute;
  top: calc(50% - 15px);
  right: -13px;
  width: 13px;
  border-color: var(--color-fill-3);
  background-color: var(--color-fill-1);
  color: var(--color-text-3);
  ;
  border-radius: 0 5px 5px 0;
}

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
  border: 1px solid var(--color-border);
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
