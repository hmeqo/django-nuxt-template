<script setup lang="ts">
import { useError } from '#imports'

const error = useError()
</script>

<template>
  <NaiveConfigProvider v-if="error">
    <NLayout class="absolute flex items-center justify-center w-full h-full overflow-hidden">
      <NaiveErrorInfo v-if="error.statusCode === 403" title="403 禁止访问" description="总有些门是对你关闭的" />
      <NaiveErrorInfo
        v-else-if="error.statusCode === 404"
        title="404 资源不存在"
        description="请确认您输入的地址是否正确"
      />
      <NaiveErrorInfo v-else :title="`${error.statusCode}`" :description="error.statusMessage || error.message || ''" />
    </NLayout>
  </NaiveConfigProvider>
</template>
