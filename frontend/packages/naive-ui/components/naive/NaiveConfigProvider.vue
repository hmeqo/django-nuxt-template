<script setup lang="ts">
import { useNaiveConfig } from '../../lib/naive-config'

const props = defineProps<{
  light?: boolean
  dark?: boolean
}>()

const { theme, themeOverrides, locale, dateLocale } = useNaiveConfig({
  colorMode: props.light ? 'light' : props.dark ? 'dark' : undefined
})
</script>

<template>
  <NaiveConfig
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="locale"
    :date-locale="dateLocale"
  >
    <slot />
  </NaiveConfig>
</template>
