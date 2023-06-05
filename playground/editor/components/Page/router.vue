<script setup lang='ts'>
import { Message } from '@arco-design/web-vue'
import { storeToRefs } from 'pinia'

const editor = useEditor()
const { router, routerActive, componentsJson } = storeToRefs(editor)

const visible = ref(false)
const form = ref({
  name: '',
  path: '',
})

function handleBeforeOk(done: any) {
  if (!form.value.name) {
    Message.error('请输入页面名称')
    done(false)
  }
  if (!form.value.path) {
    Message.error('请输入页面路径')
    done(false)
  }

  // 判断router里面有没有重复出path
  const hasPath = router.value.some(v => v.path === form.value.path)
  if (hasPath) {
    Message.error('页面已存在')
    return done(false)
  }

  router.value.push({
    name: form.value.name,
    path: form.value.path,
    components: [],
  })
  form.value = {
    name: '',
    path: '',
  }
  done(true)
}
function handleCancel() {
  visible.value = false
}

function changeRouter(e: string) {
  routerActive.value = Number(e)
  componentsJson.value = router.value[Number(e)].components
}

function deleteRouter(index: number) {
  router.value.splice(index, 1)
  routerActive.value = -1
  componentsJson.value = []
}
</script>

<template>
  <a-card title="路由" w="98%" mx-auto :bordered="false" :body-style="{ padding: 0 }">
    <template #extra>
      <a-button @click="visible = true">
        <template #icon>
          <icon-plus />
        </template>
      </a-button>
    </template>
    <a-menu
      :default-selected-keys="[routerActive]"
      @menu-item-click="changeRouter"
    >
      <a-menu-item v-for="v, k in router" :key="`${k}`">
        <div flex items-center justify="between">
          <p>
            {{ v.name }}
          </p>
          <a-popconfirm content="确定要删除当前路由吗？" @ok="deleteRouter(k)">
            <button
              w-32px h-32px text-center bg-gray-200 hover="bg-red-500 text-white"
              rounded class="leading-4"
            >
              <i icon-btn i-carbon:trash-can mx-auto hover:text-white />
            </button>
          </a-popconfirm>
        </div>
      </a-menu-item>
    </a-menu>
  </a-card>
  <a-modal v-model:visible="visible" title="添加路由" @cancel="handleCancel" @before-ok="handleBeforeOk">
    <a-form :model="form">
      <a-form-item field="name" label="页面名称" required>
        <a-input v-model="form.name" />
      </a-form-item>
      <a-form-item field="path" label="页面路径" required>
        <a-input v-model="form.path" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
