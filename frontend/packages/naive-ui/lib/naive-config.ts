import { darkTheme, dateEnUS, dateZhCN, enUS, lightTheme, zhCN } from 'naive-ui'
import type { ColorMode } from '../types'

export const useNaiveConfig = (opts?: { colorMode?: ColorMode }) => {
  const config = useRuntimeConfig().public.naiveui
  const locale = useLocale()
  const darkMode = useDarkMode()

  const prefersTheme = computed(() => (darkMode.value ? darkTheme : lightTheme))
  const theme = computed(() =>
    opts?.colorMode === undefined ? prefersTheme.value : opts?.colorMode === 'light' ? lightTheme : darkTheme
  )

  watch(darkMode, (v) => {
    useNaiveColorMode().colorMode.value = darkMode.value ? 'dark' : 'light'
  })

  const naiveDateLocale = computed(() => {
    switch (locale.value) {
      case 'en':
        return dateEnUS
      case 'zh-CN':
        return dateZhCN
    }
  })
  const naiveLocale = computed(() => {
    switch (locale.value) {
      case 'en':
        return enUS
      case 'zh-CN':
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
