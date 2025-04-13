<script setup lang="ts">
import { useError } from '#imports'

const error = useError()
</script>

<template>
  <NaiveConfigProvider v-if="error">
    <NLayout class="absolute flex items-center justify-center w-full h-full overflow-hidden">
      <NaiveErrorInfo
        v-if="error.statusCode === 403"
        title="403 禁止访问"
        description="您没有权限访问该页面"
        :home-url="HomeUrl"
      />
      <NaiveErrorInfo
        v-else-if="error.statusCode === 404"
        title="404 资源不存在"
        description="您访问的资源不存在"
        :home-url="HomeUrl"
      />
      <NaiveErrorInfo
        v-else
        :title="`${error.statusCode}`"
        :description="error.statusMessage || error.message || ''"
        :home-url="HomeUrl"
      />
    </NLayout>
  </NaiveConfigProvider>
</template>
