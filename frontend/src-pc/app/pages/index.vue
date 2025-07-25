<script setup lang="ts">
definePageMeta({
  middleware: clientOnly(() => routeAuth([{ auth: [IsStaff], to: Urls.admin.index }], { fallback: getLoginUrl() }))
})
</script>

<template>
  <div />
</template>
