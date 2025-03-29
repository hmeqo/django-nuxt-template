<script setup lang="ts">
import { useRoute } from '#imports'

const route = useRoute()

const { enabled, paths, removePath } = usePageHistory()
</script>

<template>
  <NLayout>
    <NScrollbar v-if="enabled" x-scrollable>
      <div class="nav" :size="0">
        <NuxtLink
          v-for="i in paths"
          :key="i.name"
          class="nav-item"
          :class="{ active: route.name === i.name }"
          :to="i.path"
          @click.middle="removePath(i)"
        >
          <div v-if="i.icon" class="nav-item-icon">
            <div class="nav-item-icon-inner" :class="i.icon" />
          </div>
          <div>{{ i.title }}</div>
          <div v-if="paths.length > 1" class="nav-item-close" @click.stop.prevent="removePath(i)">
            <div class="nav-item-close-inner i-material-symbols:close" />
          </div>
        </NuxtLink>
        <div class="nav-fill w-full" />
      </div>
    </NScrollbar>
  </NLayout>
</template>

<style scoped>
.nav {
  --uno: 'flex';
  user-select: none;
}

.nav-item {
  --uno: 'shrink-0 flex items-center px-4 py-2 border-r-1 border-r-solid border-[#8882] cursor-pointer transition-all *:shrink-0';
}

.nav-item,
.nav-fill {
  --uno: 'border-b-1 border-b-solid border-b-[#8882]';
}

.nav-item:hover:not(.active) {
  --uno: 'bg-gray-50 dark:bg-truegray-900';
}

.nav-item:hover,
.nav-item.active {
  --uno: 'text-blue-500';
}

.nav-item.active {
  --uno: 'border-b-transparent bg-transparent';
}

.nav-item-icon {
  --uno: 'h-6 aspect-square mr-1';
}

.nav-item-icon-inner {
  --uno: 'w-full h-full';
}

.nav-item-close {
  --uno: 'h-5 aspect-square ml-2 p-0.5 rounded-1 hover:bg-[#7f7f7f3f] transition-all';
}

.nav-item-close-inner {
  --uno: 'w-full h-full bg-truegray-600';
}
</style>
