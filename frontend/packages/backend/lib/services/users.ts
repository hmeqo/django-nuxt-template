import { alovaInst } from '@workspace-hmeqo/backend/lib/alova'

const urls = urlsEnsureEndSlash(
  createUrls('api', {
    users: createUrls('users', {
      me: 'me',
      detail: createUrls('{id}', {
        resetPassword: 'reset_password'
      })
    })
  })
)

export const UserSrv = {
  list(params?: { is_active?: boolean }) {
    return alovaInst.Get<UserSer[]>(urls.users.index, { params })
  },

  create(data: UserSerRequest) {
    return alovaInst.Post<UserSer>(urls.users.index, data)
  },

  retrieve(id: number) {
    return alovaInst.Get<UserSer>(format(urls.users.detail.index, { id }))
  },

  update(id: number, data: UserSerRequest) {
    return alovaInst.Put<UserSer>(format(urls.users.detail.index, { id }), data)
  },

  destroy(id: number) {
    return alovaInst.Delete(format(urls.users.detail.index, { id }))
  },

  me() {
    return alovaInst.Get<UserSer>(urls.users.me)
  },

  resetPassword(id: number, data: UserResetPwdSerRequest) {
    return alovaInst.Post(format(urls.users.detail.resetPassword, { id }), data)
  }
}
