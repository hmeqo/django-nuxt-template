<script setup lang="ts">
defineProps<{
  active?: boolean
}>()
</script>

<template>
  <div class="w-4 h-4">
    <div v-if="active" class="i-clarity:success-standard-solid w-full h-full bg-green-500" />
    <div v-else class="i-clarity:remove-solid w-full h-full bg-red-500" />
  </div>
</template>
