<script setup lang="ts">
definePageMeta({
  layout: 'login',
  middleware: clientOnly(() => routeAuth([{ auth: [isSuperuser], to: Urls.admin.index }])),
  title: '登录',
  tags: [Urls.login]
})

const { isMobile } = useNaiveDevice()
</script>

<template>
  <NCard class="max-w-100 rounded-1" :segmented="{ content: true }">
    <template #header>
      <div class="text-center">登录</div>
    </template>
    <div :class="isMobile ? 'flex flex-col justify-end h-full max-h-110 pb-30' : 'py-2'">
      <UserLoginForm />
    </div>
  </NCard>
</template>
