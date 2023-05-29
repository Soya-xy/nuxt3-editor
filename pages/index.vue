<script setup lang="ts">
const online = useOnline()
</script>

<template>
  <div>
    <Suspense>
      <ClientOnly>
        <div v-if="online">
          <NuxtLink btn to="editor" m2>
            To Edit
          </NuxtLink>
        </div>
        <div v-else text-gray:80>
          You're offline
        </div>
      </ClientOnly>
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
  </div>
</template>
