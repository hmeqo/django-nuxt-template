<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description: string
    status?: 'error' | '500' | 'info' | 'success' | 'warning' | '404' | '403' | '418'
  }>(),
  {
    status: 'error'
  }
)
</script>

<template>
  <NResult
    class="flex flex-col w-full h-full justify-center"
    :title="title"
    :description="description"
    :status="status"
    size="huge"
  >
    <template #footer>
      <NFlex class="w-[max-content] mx-auto">
        <NButton tertiary @click="navigateBack">返回</NButton>
        <NButton tertiary @click="routerRedirect(HomeUrl)">返回主页</NButton>
      </NFlex>
    </template>
  </NResult>
</template>
