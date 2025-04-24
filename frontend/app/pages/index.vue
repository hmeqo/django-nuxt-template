<script setup lang="ts">
definePageMeta({
  middleware: clientOnly(() => routeAuth([{ auth: [isSuperuser], redirect: Urls.admin.index }], { fallback: LoginUrl }))
})
</script>

<template>
  <div />
</template>
