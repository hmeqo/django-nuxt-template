<script setup lang="ts">
definePageMeta({
  layout: 'login',
  title: '登录',
  tags: [PP.login],
  middleware: checkLoginPagePerm
})

const { isMobile } = useNaiveDevice()
</script>

<template>
  <NCard
    :class="isMobile ? 'w-full h-full' : 'max-w-100 h-auto rounded-1'"
    :segmented="{ content: true }"
    :bordered="!isMobile"
  >
    <template #header>
      <span>登录</span>
    </template>
    <!-- <template #header-extra>
      <span></span>
    </template> -->
    <div :class="isMobile ? 'flex flex-col justify-end h-full max-h-110 pb-30' : 'py-2'">
      <UserLoginForm />
    </div>
  </NCard>
</template>
