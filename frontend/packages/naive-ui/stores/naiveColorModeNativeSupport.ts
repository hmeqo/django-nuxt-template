// import { setResponseHeader } from 'h3'
// import type { ColorMode, ColorModePreference, ModuleOptions } from '../types'

// export const useNaiveColorMode = () => {
//   const config = useRuntimeConfig().public.naiveUi as ModuleOptions

//   const systemColorModeState = useState<ColorMode>('color-mode-system', () => config.defaultColorMode)
//   const colorModePreferenceStore = usePiniaLocalStorage<ColorModePreference>(
//     'color-mode',
//     <ColorModePreference>(piniaPluginPersistedstate.localStorage().getItem('color-mode') || config.colorModePreference)
//   )
//   if (!['light', 'dark', 'system'].some((x) => x === colorModePreferenceStore.value)) {
//     colorModePreferenceStore.value = config.colorModePreference
//   }

//   const systemColorMode = computed(() => systemColorModeState.value)
//   const colorModePreference = computed({
//     get: () => colorModePreferenceStore.value,
//     set: (v) => (colorModePreferenceStore.value = v)
//   })
//   const colorMode = computed({
//     get: (): ColorMode => {
//       if (colorModePreference.value === 'system') {
//         return systemColorMode.value
//       }
//       return colorModePreference.value
//     },
//     set: (v) => (colorModePreference.value = v)
//   })

//   return {
//     systemColorMode,
//     colorModePreference,
//     colorMode,

//     syncSystemColorMode() {
//       systemColorModeState.value = detectPrefersColorMode()
//     },
//     syncHtmlClass() {
//       if (!import.meta.client) return
//       if (colorMode.value === 'light') {
//         document.documentElement.classList.remove('dark')
//         document.documentElement.classList.add('light')
//       } else {
//         document.documentElement.classList.remove('light')
//         document.documentElement.classList.add('dark')
//       }
//     }
//   }
// }

// export const useNaiveDarkMode = () => {
//   const { colorMode } = useNaiveColorMode()
//   return computed({
//     get: () => colorMode.value === 'dark',
//     set: (v) => (colorMode.value = v ? 'dark' : 'light')
//   })
// }

// function detectPrefersColorMode() {
//   if (import.meta.server) {
//     const event = useRequestEvent()!
//     setResponseHeader(event, 'Accept-CH', 'Sec-CH-Prefers-Color-Scheme')
//     setResponseHeader(event, 'Vary', 'Sec-CH-Prefers-Color-Scheme')
//     setResponseHeader(event, 'Critical-CH', 'Sec-CH-Prefers-Color-Scheme')

//     const headers = useRequestHeaders()
//     return headers['sec-ch-prefers-color-scheme'] === 'dark' ? 'dark' : 'light'
//   } else {
//     return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
//   }
// }
