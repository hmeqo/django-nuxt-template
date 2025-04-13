<script setup lang="ts">
defineProps<{
  user?: User | null
  compact?: boolean
}>()
</script>

<template>
  <div v-if="user" class="flex gap-2 px-2 py-1" :class="{ '!items-center': compact }">
    <div class="i-material-symbols:account-circle-outline text-4xl" :class="{ '!text-2xl': compact }" />
    <div v-if="user.display_name" class="flex-1 min-w-0" :class="{ '!line-height-none !text-xs': compact }">
      <div class="truncate" :title="user.display_name">
        {{ user.display_name }}
      </div>
      <div class="text-truegray-400 text-xs truncate" :title="user.username">@{{ user.username }}</div>
    </div>
    <div v-else>
      <div class="truncate" :title="user.username">@{{ user.username }}</div>
    </div>
  </div>
</template>
