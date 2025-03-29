// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.hook('app:mounted', () => {
//     const { syncSystemColorMode, syncHtmlClass, colorMode } = useNaiveColorMode()

//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
//     mediaQuery.addEventListener('change', () => syncSystemColorMode())

//     syncSystemColorMode()
//     watch(colorMode, syncHtmlClass, { immediate: true })
//   })
// })
