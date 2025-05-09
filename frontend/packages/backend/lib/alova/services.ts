import { boolField, enumField, intField, Model, ModelSet, StrField, strField } from '@hmeqo/easymodel'
import format from 'string-format'
import { alovaInst } from './core'

const urls = urlsEnsureEndSlash(
  createUrls('api', {
    auth: createUrls('auth', {
      login: 'login',
      logout: 'logout',
      loginState: 'login_state'
    }),
    users: createUrls('users', {
      me: 'me',
      detail: createUrls('{id}', {
        resetPassword: 'reset_password'
      })
    })
  })
)

export const Auth = {
  login(data: LoginIn, opts?: Record<string, unknown>) {
    return alovaInst.Post<UserOut>(urls.auth.login, data, opts)
  },

  logout() {
    return alovaInst.Post(urls.auth.logout)
  },

  loginState() {
    return alovaInst.Get<LoginStateOut>(urls.auth.loginState)
  }
}

export class User extends Model {
  @intField({ readonly: true }) id!: number
  @strField username!: string
  @strField display_name!: string
  @strField first_name!: string
  @strField last_name!: string
  @boolField is_active: boolean = true
  @boolField is_superuser!: boolean
  @boolField is_staff!: boolean
  @enumField({ type: UserRole, many: true }) roles!: UserRole[]

  static list() {
    return alovaInst.Get<UserSet>(urls.users.index, { meta: { model: UserSet } })
  }

  static create(data: UserCreate) {
    return alovaInst.Post<User>(urls.users.index, data, { meta: { model: User } })
  }

  static retrieve(id: number) {
    return alovaInst.Get<User>(format(urls.users.detail.index, { id }), { meta: { model: User } })
  }

  update() {
    return alovaInst.Put<User>(format(urls.users.detail.index, { id: this.id }), this, {
      meta: { model: User, instance: this }
    })
  }

  destroy() {
    return alovaInst.Delete(format(urls.users.detail.index, { id: this.id }))
  }

  me() {
    return alovaInst.Get<UserOut>(urls.users.me)
  }

  resetPassword(data: UserResetPwdIn) {
    return alovaInst.Post(format(urls.users.detail.resetPassword, { id: this.id }), data)
  }
}

export class UserSet extends ModelSet.fromModel(User) {}

export class UserResetPwd extends Model {
  @strField password!: string
  @strField({ readonly: true }) confirmPassword!: string
}

export class UserCreate extends User.include({
  password: StrField.init(),
  confirmPassword: StrField.init({ readonly: true })
}) {}
