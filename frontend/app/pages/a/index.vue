<script setup lang="ts">
definePageMeta({
  middleware: () => routeAuth([{ auth: [isSuperuser] }], { showError: true }),
  layout: 'admin',
  title: '仪表盘',
  icon: 'i-material-symbols:dashboard-outline',
  tags: [Urls.admin.index]
})
</script>

<template>
  <PageBase>
    <NCard>
      <NFlex>
        <NButton>{{ $t(i18nKeys.welcome) }}</NButton>
        <NDatePicker />
        <LangSwitch />
      </NFlex>
    </NCard>
  </PageBase>
</template>
