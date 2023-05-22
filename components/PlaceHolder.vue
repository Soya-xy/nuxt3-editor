<template>
  <div>
    <slot>
      <div class="shell" v-if="slots.default">
        <div class="inner">
          {{ name }}
        </div>
      </div>
    </slot>
  </div>
</template>

<script setup lang='ts'>
const slots = useSlots()
const name = defineProp<string>('name', { default: '占位' })
</script>
<style scoped>
.shell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  padding: 4px;
  opacity: 0.4;
  flex-shrink: 1;
  box-sizing: border-box;
  user-select: none;
}

.inner {
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  border: dashed 1px;
  background-color: var(--color-neutral-3);
  color: var(--color-neutral-10);
}
</style>
