<script setup lang="ts">
definePageMeta({
  middleware: clientOnly(() =>
    routeAuth([{ auth: [isSuperuser], to: { path: Urls.admin.index, redirect: true } }], { fallback: LoginUrl })
  )
})
</script>

<template>
  <div />
</template>
