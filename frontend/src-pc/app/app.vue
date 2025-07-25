<script setup lang="ts">
useHead({
  titleTemplate: `%s %separator %name`,
  templateParams: {
    separator: '-',
    name: 'Django Nuxt Template'
  }
  // meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }]
})
</script>

<template>
  <I18nProvider />
  <PwaProvider />
  <NuxtRouteAnnouncer />
  <NaiveWrapper>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </NaiveWrapper>
</template>
