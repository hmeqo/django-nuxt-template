export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (error) => {
    if (error instanceof MiddlewareReject) {
      if (error.message) console.log(error.message)
      return
    }
    console.error('vue:error', error)
  })
  nuxtApp.hook('app:error', (error) => {
    console.error('app:error', error)
  })
  nuxtApp.vueApp.config.errorHandler = (error: unknown) => {}
})
