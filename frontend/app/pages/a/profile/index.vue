<script setup lang="ts">
definePageMeta({
  middleware: () => routeAuth([{ auth: [isSuperuser] }], { showError: true }),
  layout: 'admin',
  title: '个人中心',
  icon: 'i-material-symbols:person-outline',
  tags: [Urls.admin.profile.index]
})

const loginState = useLoginState()
</script>

<template>
  <PageBase>
    <div>{{ loginState.user }}</div>
  </PageBase>
</template>
