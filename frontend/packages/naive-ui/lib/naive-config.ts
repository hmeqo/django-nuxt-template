import { darkTheme, dateEnUS, dateZhCN, enUS, lightTheme, zhCN } from 'naive-ui'
import type { ColorMode } from '../types'

export const useNaiveConfig = (opts?: { colorMode?: ColorMode }) => {
  const config = useRuntimeConfig().public.naiveui
  const { locale } = useI18nB()
  const prefersTheme = computed(() => (useDarkMode().value ? darkTheme : lightTheme))
  const theme = computed(() =>
    opts?.colorMode === undefined ? prefersTheme.value : opts?.colorMode === 'light' ? lightTheme : darkTheme
  )
  const naiveDateLocale = computed(() => {
    switch (locale.value) {
      case 'en-US':
        return dateEnUS
      case 'zh-Hans':
        return dateZhCN
    }
  })
  const naiveLocale = computed(() => {
    switch (locale.value) {
      case 'en-US':
        return enUS
      case 'zh-Hans':
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
