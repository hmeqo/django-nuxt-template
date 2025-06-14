<script setup lang="ts">
const error = useError()

function close() {
  import('@tauri-apps/api/window').then(({ getCurrentWindow }) => getCurrentWindow().close())
}
</script>

<template>
  <NaiveWrapper v-if="error" class="fixed flex flex-col w-full h-full">
    <TauriTitlebar />
    <NLayout class="w-full h-full" content-class="flex flex-col items-center justify-center w-full h-full">
      <div v-if="isTauri" class="flex flex-col items-center justify-center gap-4 p-8 max-w-2xl text-center">
        <NText tag="h1" class="text-3xl font-bold">应用遇到问题</NText>
        <NText tag="h2" class="text-xl text-truegray-400">
          {{ error.message || '请尝试重新加载应用' }}
        </NText>
        <div class="flex gap-4 mt-6">
          <NButton size="large" @click="close()">退出应用</NButton>
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center gap-4 p-8 max-w-2xl text-center">
        <NText tag="h1" class="text-3xl font-bold">{{ error.statusCode }}</NText>
        <p class="text-xl">出错了</p>
        <p>{{ error.message }}</p>
        <NFlex class="mt-6">
          <NButton size="large" @click="navigateBack">返回</NButton>
          <NButton size="large" @click="navigateTo(getHomeUrl())">返回首页</NButton>
        </NFlex>
      </div>
    </NLayout>
  </NaiveWrapper>
</template>
