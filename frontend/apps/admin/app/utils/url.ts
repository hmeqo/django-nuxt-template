export const Urls = createUrls('', {
  login: 'login',
  profile: createUrls('profile', {}),
  admin: createUrls('a', {
    profile: createUrls('profile', {}),
    user: createUrls('user', {})
  })
})

export function getHomeUrl() {
  return Urls.index
}

export function getLoginUrl() {
  return Urls.login
}
