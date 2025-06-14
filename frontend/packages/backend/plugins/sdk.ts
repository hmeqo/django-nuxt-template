import { OpenAPI } from '../lib/sdk'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  if (runtimeConfig.public.cors) {
    OpenAPI.BASE = runtimeConfig.public.apiBase
  }
  //   OpenAPI.CREDENTIALS = 'include'
  OpenAPI.WITH_CREDENTIALS = true
  OpenAPI.HEADERS = {
    // 'Content-Type': 'application/json',
    [useCsrf().headerName]: useCsrf().csrf,
    ...OpenAPI.HEADERS
  }
})
