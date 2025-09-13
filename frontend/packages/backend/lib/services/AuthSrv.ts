import { createPaths, pathsEnsureEndSlash } from '@hmeqo/paths'
import { alovaInst } from '@workspace/alova/lib/core'
import type { AuthStateSer, LoginSerRequest } from '../sdk'

const urls = pathsEnsureEndSlash(
  createPaths('', {
    auth: createPaths('auth', {
      login: 'login',
      logout: 'logout',
      state: 'state'
    })
  })
)

export const AuthSrv = {
  login: (data: LoginSerRequest, opts?: { noMessage?: boolean }) => {
    return alovaInst.Post<AuthStateSer>(urls.auth.login, data, { meta: { noMessage: opts?.noMessage } })
  },

  logout: () => {
    return alovaInst.Post(urls.auth.logout)
  },

  state: () => {
    return alovaInst.Get<AuthStateSer>(urls.auth.state, { meta: { noMessage: true } })
  }
}
