<script setup lang="ts">
import { createEngine, useEngine } from '~/composables/engine'

const engine = useEngine()
const editor = useEditor()

const actionArea = $ref<HTMLElement>()
const router = useRouter()
const route = useRoute()
const collapsed = ref(false)
const menuActive = ref(['0'])
const actionActive = ref(route.path)
const actionMenu = ref([
  {
    title: '画板',
    icon: 'i-carbon:insert-syntax',
    url: '/editor',
  },
  {
    title: 'JSON',
    icon: 'i-mdi:code-json',
    url: '/editor/json',
  },

])
function onCollapse() {
  collapsed.value = !collapsed.value
}
function actionClick(v: string) {
  actionActive.value = v
  router.push(v)
}

onMounted(() => {
  if (actionArea) {
    createEngine().forEach((e) => {
      engine.register(e)
    })
  }
})
function save() {
  console.log(JSON.stringify(editor.componentsJson))
}
</script>

<template>
  <a-layout class="layout-demo">
    <a-layout-header flex="~" items-center justify="between">
      <div ml2>
        Nuxt3-Editor
      </div>

      <div mr-2 flex="~ 1" items-center justify="end">
        <a-button size="large" mr2>
          <NuxtLink to="https://github.com/Soya-xy/nuxt3-editor" flex="~ center">
            <i icon-btn i-carbon:logo-github /> Github
          </NuxtLink>
        </a-button>
        <a-button size="large" type="primary" @click="save">
          保存
        </a-button>
      </div>
    </a-layout-header>
    <div id="actionArea" ref="actionArea" flex="~ row" m0 p0 wh-full>
      <a-layout>
        <a-layout-sider hide-trigger breakpoint="lg" :width="220" :collapsed="true">
          <a-menu v-model:selected-keys="menuActive" h-full :default-selected-keys="['0']" @collapse="onCollapse">
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
            <main v-show="!collapsed" w-full>
              <PageContent :active="menuActive" />
            </main>
            <button class="toggle-button" @click="onCollapse">
              <IconLeft v-if="!collapsed" />
              <IconRight v-else />
            </button>
          </div>
        </a-layout-sider>
        <a-layout style="padding: 0 18px;">
          <div flex my1 justify="end">
            <button
              v-for="v in actionMenu" :key="v.url" p1 hover:bg-gray-200 ml2
              :class="{ 'bg-white': actionActive === v.url }" @click="actionClick(v.url)"
            >
              <i icon-btn :class="v.icon" />
            </button>
          </div>
          <a-layout-content>
            <div id="NX-Editor" wh-full transform="">
              <slot />
              <OutLine />
            </div>
          </a-layout-content>
          <a-layout-footer>
            <a-breadcrumb>
              <template #separator>
                <icon-right />
              </template>
              <a-breadcrumb-item>Home</a-breadcrumb-item>
              <a-breadcrumb-item>Channel</a-breadcrumb-item>
              <a-breadcrumb-item>News</a-breadcrumb-item>
            </a-breadcrumb>
          </a-layout-footer>
        </a-layout>
        <a-layout-sider hide-trigger breakpoint="lg" :width="220">
          <a-menu v-model:selected-keys="menuActive" h-full :default-selected-keys="['0']" @collapse="onCollapse">
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
      </a-layout>
    </div>
  </a-layout>
  <Ghost />
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
  height: 28px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 28px;
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
