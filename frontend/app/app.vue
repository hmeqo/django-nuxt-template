<script setup lang="ts">
useHead({
  titleTemplate: `%s %separator %name`,
  templateParams: {
    separator: '-',
    name: 'Django Nuxt Template'
  }
})
</script>

<template>
  <div>
    <I18nProvider />
    <NuxtPwaManifest />
    <NuxtPwaAssets />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
