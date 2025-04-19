export default defineEventHandler((event) => {
  return proxyRequest(event, `${useRuntimeConfig().public.apiBase}${event.path.replace('/api/', '/')}`)
})
