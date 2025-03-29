import type { ConfigProviderProps } from 'naive-ui'

export type ColorMode = 'light' | 'dark'

export type ColorModePreference = ColorMode | 'system'

export type ModuleOptions = {
  defaultColorMode: ColorMode
  colorModePreference: ColorModePreference
  colorModePreferenceCookieName: string
  themeConfig?: {
    shared: ConfigProviderProps['themeOverrides']
  }
}
