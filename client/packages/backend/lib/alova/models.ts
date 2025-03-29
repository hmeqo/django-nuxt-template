import { booleanField, enumField, integerField, Model, ModelSet, stringField } from '@hmeqo/easymodel'
import format from 'string-format'
import { $UserOut, RolesEnum, type LoginStateOut, type UserOut } from '../sdk'
import { alovaInst } from './core'

const urls = urlsEnsureEndSlash(
  createUrls('', {
    auth: createUrls('auth', {
      login: 'login',
      loginstate: 'loginstate',
      logout: 'logout'
    }),
    users: createUrls('users', {
      detail: '{id}'
    })
  })
)

export const Auth = {
  login(data: LoginIn) {
    return alovaInst.Post<LoginStateOut>(urls.auth.login, data)
  },

  loginState() {
    return alovaInst.Get<LoginStateOut>(urls.auth.loginstate)
  },

  logout() {
    return alovaInst.Post(urls.auth.logout)
  }
}

export class User extends Model implements UserOut {
  @integerField({ readonly: true }) id!: number
  @stringField username!: string
  @stringField display_name!: string
  @stringField first_name!: string
  @stringField last_name!: string
  @booleanField is_active!: boolean
  @booleanField is_superuser!: boolean
  @booleanField is_staff!: boolean
  @enumField({ type: RolesEnum, many: true }) roles!: RolesEnum[]

  static $rules = schemaToNaiveRules($UserOut)

  static list() {
    return alovaInst.Get<ModelSet<User>>(urls.users.index, { meta: { model: ModelSet.fromModel(User) } })
  }

  static create(data: User) {
    return alovaInst.Post<User>(urls.users.index, data)
  }

  static retrieve(id: number) {
    return alovaInst.Get<User>(format(urls.users.detail, { id }), { meta: { model: User } })
  }

  update() {
    return alovaInst.Put<User>(format(urls.users.detail, { id: this.id }), this, { meta: { model: User } })
  }

  destroy() {
    return alovaInst.Delete(format(urls.users.detail, { id: this.id }))
  }
}
