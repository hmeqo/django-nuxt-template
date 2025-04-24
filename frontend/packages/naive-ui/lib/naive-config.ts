import { darkTheme, dateEnUS, dateZhCN, enUS, lightTheme, zhCN } from 'naive-ui'
import type { ColorMode } from '../types'

export const useNaiveConfig = (opts?: { colorMode?: ColorMode }) => {
  const config = useRuntimeConfig().public.naiveui
  const { getLocale } = useI18n()
  const prefersTheme = computed(() => (useNaiveDarkMode().value ? darkTheme : lightTheme))
  const theme = computed(() =>
    opts?.colorMode === undefined ? prefersTheme.value : opts?.colorMode === 'light' ? lightTheme : darkTheme
  )
  const naiveDateLocale = computed(() => {
    switch (getLocale()) {
      case 'en':
        return dateEnUS
      case 'zh':
        return dateZhCN
    }
  })
  const naiveLocale = computed(() => {
    switch (getLocale()) {
      case 'en':
        return enUS
      case 'zh':
        return zhCN
    }
  })
  const themeOverrides = computed(() => config.themeConfig.shared || {})
  return {
    theme: theme,
    themeOverrides: themeOverrides,
    dateLocale: naiveDateLocale,
    locale: naiveLocale
  }
}
