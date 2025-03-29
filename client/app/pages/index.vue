<script setup lang="ts">
definePageMeta({
  middleware: () => routeAuth({ auth: [FA], fallback: Urls.login }, { auth: [IsAdmin], redirect: Urls.mgr.index })
})
</script>

<template>
  <div />
</template>
