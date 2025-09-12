import { createPaths, pathsEnsureEndSlash } from '@hmeqo/paths'
import { alovaInst } from '@workspace-hmeqo/alova/lib/core'
import type { LoginSerRequest, LoginStateSer } from '../sdk'

const urls = pathsEnsureEndSlash(
  createPaths('', {
    auth: createPaths('auth', {
      login: 'login',
      logout: 'logout',
      loginState: 'login_state'
    })
  })
)

export const AuthSrv = {
  login: (data: LoginSerRequest, opts?: { noMessage?: boolean }) => {
    return alovaInst.Post<LoginStateSer>(urls.auth.login, data, { meta: { noMessage: opts?.noMessage } })
  },

  logout: () => {
    return alovaInst.Post(urls.auth.logout)
  },

  loginState: () => {
    return alovaInst.Get<LoginStateSer>(urls.auth.loginState, { meta: { noMessage: true } })
  }
}
