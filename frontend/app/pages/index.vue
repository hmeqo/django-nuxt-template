<script setup lang="ts">
definePageMeta({
  middleware: clientOnly(() =>
    routeAuth([{ auth: [isSuperuser], to: { path: Urls.admin.index, redirect: true } }], { fallback: getLoginUrl() })
  )
})
</script>

<template>
  <div />
</template>
