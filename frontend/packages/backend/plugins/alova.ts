import { alovaInst } from '../lib/alova/core'

export default defineNuxtPlugin(() => {
  if (useRuntimeConfig().public.cors) {
    alovaInst.options.baseURL = useRuntimeConfig().public.apiBase
  }
})
