<script setup lang="ts">
withDefaults(
  defineProps<{
    rounded?: boolean
    embedded?: boolean
  }>(),
  { rounded: true }
)

const isMaximized = ref(false)

function minimize() {}

function toggleMaximize() {}

function close() {}
</script>

<template>
  <div v-if="isAppMode" class="flex select-none" :class="{ 'p-1': !embedded }">
    <div class="flex h-full ml-auto">
      <div class="titlebar-button" @click="minimize">
        <div :class="{ 'rounded-full': rounded }">
          <div class="i-material-symbols:chrome-minimize-rounded w-4 h-4" />
        </div>
      </div>
      <div class="titlebar-button" @click="toggleMaximize">
        <div :class="{ 'rounded-full': rounded }">
          <div
            class="i-material-symbols:chrome-maximize-outline w-4 h-4"
            :class="{ 'i-material-symbols:chrome-restore-outline': isMaximized }"
          />
        </div>
      </div>
      <div class="titlebar-button" @click="close">
        <div :class="{ 'rounded-full': rounded }">
          <div class="i-material-symbols:close-rounded w-5 h-5" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.titlebar-button {
  --uno: 'flex items-center justify-center select-none';
}

.titlebar-button > * {
  --uno: 'flex items-center justify-center m-0.5 w-7 h-7 transition-all';
}

.titlebar-button:hover > * {
  --uno: 'bg-[#7f7f7f3f]';
}

.titlebar-button.rounded {
  --uno: 'rounded-full';
}
</style>
