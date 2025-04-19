<script setup lang="ts">
const props = defineProps<{
  iconify?: boolean
  min?: boolean
}>()

const darkMode = useDarkMode()
const { colorModePreference } = useNaiveColorMode()
const colorMode = computed({
  get: () => colorModePreference.get(),
  set: (v) => colorModePreference.set(v)
})

function switchColorMode() {
  if (props.min) {
    if (darkMode.value) {
      darkMode.value = false
    } else {
      darkMode.value = true
    }
  } else {
    if (colorModePreference.get() === 'system') {
      colorModePreference.set('light')
    } else if (colorModePreference.get() === 'light') {
      colorModePreference.set('dark')
    } else if (colorModePreference.get() === 'dark') {
      colorModePreference.set('system')
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
        v-if="colorModePreference.get() === 'light'"
        class="i-material-symbols:light-mode-outline-rounded bg-truegray-800"
      />
      <div
        v-else-if="colorModePreference.get() === 'dark'"
        class="i-material-symbols:dark-mode-outline-rounded bg-truegray-100"
      />
      <div
        v-else-if="colorModePreference.get() === 'system'"
        class="i-material-symbols:computer-outline bg-truegray-800 dark:bg-truegray-100"
      />
    </Transition>
  </NButton>
  <NRadioGroup v-else v-model:value="colorMode">
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
