export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig()
  return proxyRequest(event, `${runtimeConfig.public.apiBase}${event.path.substring(4)}`)
})
