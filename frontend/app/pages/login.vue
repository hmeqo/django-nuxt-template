<script setup lang="ts">
definePageMeta({
  layout: 'login',
  middleware: clientOnly(() => routeAuth([{ auth: [isSuperuser], to: Urls.admin.index }])),
  title: '登录',
  tags: [Urls.login]
})
</script>

<template>
  <NCard class="max-w-100 rounded-1" :segmented="{ content: true }">
    <template #header>
      <div class="text-center">登录</div>
    </template>
    <UserLoginForm />
  </NCard>
</template>
