<script setup lang="ts">
definePageMeta({
  middleware: () => routeAuth({ auth: [FA], fallback: Urls.login }, { auth: [IsSuperuser], redirect: Urls.admin.index })
})
</script>

<template>
  <div />
</template>
