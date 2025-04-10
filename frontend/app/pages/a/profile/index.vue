<script setup lang="ts">
definePageMeta({
  middleware: () => routeAuth({ auth: [FA] }, { auth: [IsSuperuser], showError: true }),
  layout: 'admin',
  title: '个人中心',
  icon: 'i-material-symbols:person-outline',
  tags: [Urls.admin.profile.index]
})

const { user } = useLoginState()
</script>

<template>
  <PageBase>
    <div>{{ user }}</div>
  </PageBase>
</template>
