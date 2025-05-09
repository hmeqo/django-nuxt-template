<script setup lang="ts">
const error = useError()
</script>

<template>
  <NaiveWrapper v-if="error" class="fixed flex flex-col w-full h-full">
    <AppTitlebar />
    <NLayout class="w-full h-full" content-class="flex flex-col items-center justify-center w-full h-full">
      <div class="flex flex-col items-center justify-center gap-4 p-8 max-w-2xl text-center">
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
