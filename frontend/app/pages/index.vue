<script setup lang="ts">
definePageMeta({
  middleware: clientOnly(() => routeAuth([{ auth: [isSuperuser], to: Urls.admin.index }], { fallback: getLoginUrl() }))
})
</script>

<template>
  <div />
</template>
