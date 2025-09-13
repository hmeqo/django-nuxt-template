import { createPaths, pathsEnsureEndSlash, rFormat } from '@hmeqo/paths'
import { alovaInst } from '@workspace/alova/lib/core'
import type { UserResetPwdSerRequest, UserSer, UserSerRequest } from '../sdk'

const urls = pathsEnsureEndSlash(
  createPaths('', {
    users: createPaths('users', {
      me: 'me',
      detail: createPaths('{id}', {
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
    return alovaInst.Get<UserSer>(rFormat(urls.users.detail.index, { id }))
  },

  update(id: number, data: UserSerRequest) {
    return alovaInst.Put<UserSer>(rFormat(urls.users.detail.index, { id }), data)
  },

  destroy(id: number) {
    return alovaInst.Delete(rFormat(urls.users.detail.index, { id }))
  },

  me() {
    return alovaInst.Get<UserSer>(urls.users.me)
  },

  resetPassword(id: number, data: UserResetPwdSerRequest) {
    return alovaInst.Post(rFormat(urls.users.detail.resetPassword, { id }), data)
  }
}
