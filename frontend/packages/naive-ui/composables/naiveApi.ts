import { defu } from 'defu'
import { createDiscreteApi, type ConfigProviderProps } from 'naive-ui'
import { useNaiveConfig } from '../lib/naive-config'

export const useNaiveApi = (configProviderProps?: ConfigProviderProps) => {
  const { theme, dateLocale, locale, themeOverrides } = useNaiveConfig()
  return createDiscreteApi(['message', 'dialog', 'notification', 'loadingBar'], {
    configProviderProps: defu(
      {
        theme: theme.value,
        themeOverrides: themeOverrides.value,
        locale: locale.value,
        dateLocale: dateLocale.value
      },
      configProviderProps
    )
  })
}
