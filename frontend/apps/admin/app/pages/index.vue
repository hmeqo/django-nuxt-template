<script setup lang="ts">
definePageMeta({
  middleware: clientOnly(() => routeAuth([{ auth: [IsStaff], to: PP.admin.index }], { fallback: getLoginUrl() }))
})
</script>

<template>
  <div />
</template>
