import { dateEnUS, dateZhCN, enUS, zhCN } from 'naive-ui'

export const useNaiveConfig = () => {
  const locale = useLocale()

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

  return {
    dateLocale: naiveDateLocale,
    locale: naiveLocale
  }
}
