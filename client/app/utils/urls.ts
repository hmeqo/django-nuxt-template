export const Urls = createUrls('', {
  login: 'login',
  mgr: createUrls('management', {})
})

export const HomeUrl = Urls.index
