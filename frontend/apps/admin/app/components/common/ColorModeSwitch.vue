<script setup lang="ts">
const props = defineProps<{
  iconify?: boolean
  min?: boolean
}>()

const { darkMode, colorModePreference } = useColorModeApi()

function switchColorMode() {
  if (props.min) {
    darkMode.value = !darkMode.value
  } else {
    if (colorModePreference.value === 'system') {
      colorModePreference.value = 'light'
    } else if (colorModePreference.value === 'light') {
      colorModePreference.value = 'dark'
    } else if (colorModePreference.value === 'dark') {
      colorModePreference.value = 'system'
    }
  }
}
</script>

<template>
  <NButton v-if="iconify" class="!px-0 overflow-hidden cursor-pointer" @click="switchColorMode">
    <Transition v-if="min" class="color-mode-icons" name="rtl" mode="out-in">
      <div v-if="!darkMode" class="i-material-symbols:light-mode-outline-rounded bg-truegray-800" />
      <div v-else class="i-material-symbols:dark-mode-outline-rounded bg-truegray-100" />
    </Transition>
    <Transition v-else class="color-mode-icons" name="rtl" mode="out-in">
      <div
        v-if="colorModePreference === 'light'"
        class="i-material-symbols:light-mode-outline-rounded bg-truegray-800"
      />
      <div
        v-else-if="colorModePreference === 'dark'"
        class="i-material-symbols:dark-mode-outline-rounded bg-truegray-100"
      />
      <div
        v-else-if="colorModePreference === 'system'"
        class="i-material-symbols:computer-outline bg-truegray-800 dark:bg-truegray-100"
      />
    </Transition>
  </NButton>
  <NRadioGroup v-else v-model:value="colorModePreference">
    <NRadioButton value="light" label="浅色" />
    <NRadioButton value="dark" label="深色" />
    <NRadioButton value="system" label="跟随系统" />
  </NRadioGroup>
</template>

<style scoped>
.color-mode-icons {
  --uno: '*:shrink-0 mx-3.5 w-5 h-5';
}
</style>
