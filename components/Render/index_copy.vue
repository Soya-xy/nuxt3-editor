<script setup lang='ts'>
import type { IComponents } from '~/composables/editor'

const slot = useSlots()
const isArray = isArr
const components = defineProp<IComponents>('components')
const haveSlot = defineProp<boolean>('haveSlot')
const slotName = defineProp<string>('slotName')
const renderComponent = computed(() => {
  if (components.value.componentName)
    return resolveComponent(components.value.componentName)
})
</script>

<template>
  <component :is="renderComponent" v-if="renderComponent" :id="components.componentId">
    <template v-for="(v, n) in slot" :key="n" #[n]>
      <slot :name="n" />
    </template>
  </component>

  <template v-if="isArray(components) && components.length > 0 && !haveSlot">
    <template v-for="v in components" :key="v">
      <template v-if="v.children">
        <Render :components="v" :have-slot="v.slotsName.length > 0 ? true : false">
          <template v-for="slots, k in v.slotsName" #[slots] :key="k">
            <template v-for="item in v.children" :key="item">
              <Render v-if="item.slots === slots" :components="item" :slot-name="item.slots" />
            </template>
          </template>
        </Render>
      </template>
      <template v-else>
        <div>
          <Render :components="v" />
        </div>
      </template>
    </template>
  </template>
</template>
