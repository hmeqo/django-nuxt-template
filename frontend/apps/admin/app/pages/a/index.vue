<script setup lang="ts">
definePageMeta({
  middleware: () => routeAuth([{ auth: [IsStaff] }], { showError: true }),
  layout: 'admin',
  title: '仪表盘',
  icon: 'i-material-symbols:dashboard-outline',
  tags: [PP.admin.index]
})
</script>

<template>
  <PageBase>
    <NCard>
      <NFlex>
        <NButton>{{ $t(i18nKeys.welcome) }}</NButton>
        <NDatePicker />
        <NaiveLangSwitch />
      </NFlex>
    </NCard>
  </PageBase>
</template>
