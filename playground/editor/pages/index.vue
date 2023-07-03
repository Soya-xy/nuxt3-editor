<script setup lang="ts">
const online = useOnline()
const video = ref()
function send() {
  video.value.contentWindow.postMessage('capture', '*')
}
</script>

<template>
  <div>
    <iframe ref="video" src="http://localhost:3001/?channel=7b7cfa9c1e1b445493fa565652c8edf7&stream=1" width="800px" height="500px" />
    <p text-red @click="send">
      12312
    </p>
    <!-- <Suspense>
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
    </Suspense> -->
  </div>
</template>
