<script setup lang="ts">
definePageMeta({
  middleware: () => routeAuth({ auth: [FA] }, { auth: [IsStaff], showError: true }),
  layout: 'admin',
  title: '仪表盘',
  icon: 'i-ic:baseline-dashboard',
  tags: [Urls.admin.index]
})
</script>

<template>
  <ComCtl>
    <NButton>{{ $t(i18nKeys.welcome) }}</NButton>
    <NDatePicker />
    <LangSwitch />
  </ComCtl>
</template>
