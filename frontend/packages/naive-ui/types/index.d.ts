import type { ModuleOptions as NaiveUiModuleOptions } from '@bg-dev/nuxt-naiveui'

export type ColorMode = 'light' | 'dark'

export type ColorModePreference = ColorMode | 'system'

export type ModuleOptions = NaiveUiModuleOptions & {
  // defaultColorMode: ColorMode
  colorModePreference: ColorModePreference
  colorModePreferenceCookieName: string
}
