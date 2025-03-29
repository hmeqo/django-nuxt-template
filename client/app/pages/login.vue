<script setup lang="ts">
definePageMeta({
  layout: 'login',
  middleware: () => routeAuth({ auth: [FA] }, { auth: [IsAdmin], redirect: Urls.mgr.index }),
  title: '登录',
  tags: [Urls.login]
})
</script>

<template>
  <NCard class="max-w-100 rounded-1" :segmented="{ content: true }">
    <template #header>
      <div class="text-center">登录</div>
    </template>
    <LoginForm />
  </NCard>
</template>
