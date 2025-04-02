<script setup lang="ts">
definePageMeta({
  middleware: () => routeAuth({ auth: [FA] }, { auth: [IsStaff], showError: true }),
  layout: 'admin',
  title: 'Test',
  icon: 'i-ic:baseline-dashboard',
  tags: [Urls.admin.test]
})
</script>

<template>
  <ComCtl>
    <p>Test</p>
  </ComCtl>
</template>
