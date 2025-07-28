<script setup lang="ts">
defineProps<{
  user?: User | UserSer | null
  compact?: boolean
  contentClass?: string
}>()
</script>

<template>
  <NLayout
    v-if="user"
    class="bg-transparent"
    :content-class="`flex ${compact ? 'gap-1' : 'gap-2 px-2 py-1'} items-center ${contentClass}`"
  >
    <div class="i-material-symbols:account-circle-outline text-3xl" :class="{ '!text-2xl': compact }" />
    <div v-if="user.display_name" class="flex-1 min-w-0" :class="{ '!line-height-none !text-xs': compact }">
      <div class="truncate" :title="user.display_name">
        {{ user.display_name }}
      </div>
      <div class="text-truegray-500 text-xs truncate line-height-none" :title="user.username">@{{ user.username }}</div>
    </div>
    <div v-else>
      <div class="truncate" :title="user.username">@{{ user.username }}</div>
    </div>
  </NLayout>
</template>
