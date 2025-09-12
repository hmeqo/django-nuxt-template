import { createPaths } from '@hmeqo/paths'

export const PP = createPaths('', {
  login: 'login',
  profile: createPaths('profile', {}),
  admin: createPaths('a', {
    profile: createPaths('profile', {}),
    user: createPaths('user', {})
  })
})

export function getHomeUrl() {
  return PP.index
}

export function getLoginUrl() {
  return PP.login
}

export const checkLoginPagePerm = clientOnly(() => routeAuth([{ auth: [IsStaff], to: PP.admin.index }]))
