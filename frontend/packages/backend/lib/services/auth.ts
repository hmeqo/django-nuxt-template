import { alovaInst } from '@workspace-hmeqo/backend/lib/alova'

const urls = urlsEnsureEndSlash(
  createUrls('api', {
    auth: createUrls('auth', {
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
    return alovaInst.Get<LoginStateSer>(urls.auth.loginState)
  }
}
