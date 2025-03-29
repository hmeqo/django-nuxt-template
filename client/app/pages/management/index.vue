<script setup lang="ts">
definePageMeta({
  middleware: () => routeAuth({ auth: [FA] }, { auth: [IsAdmin], showError: true }),
  layout: 'management',
  title: '仪表盘',
  icon: 'i-ic:baseline-dashboard',
  tags: [Urls.mgr.index]
})
</script>

<template>
  <ComCtl>
    <NButton>{{ $t(i18nKeys.welcome) }}</NButton>
    <NDatePicker />
    <LangSwitch />
  </ComCtl>
</template>
