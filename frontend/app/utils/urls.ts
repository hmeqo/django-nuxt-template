export const Urls = createUrls('', {
  login: 'login',
  admin: createUrls('bg', {
    test: 'test'
  })
})

export const HomeUrl = Urls.index
