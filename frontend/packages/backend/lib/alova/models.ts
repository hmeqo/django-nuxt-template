import { booleanField, enumField, integerField, Model, ModelSet, StringField, stringField } from '@hmeqo/easymodel'
import type { FormRules } from 'naive-ui'
import format from 'string-format'
import { alovaInst } from './core'

const urls = urlsEnsureEndSlash(
  createUrls('', {
    auth: createUrls('auth', {
      login: 'login',
      loginstate: 'loginstate',
      logout: 'logout'
    }),
    users: createUrls('users', {
      detail: createUrls('{id}', {
        resetPassword: 'reset_password'
      })
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

export class User extends Model {
  @integerField({ readonly: true }) id!: number
  @stringField username!: string
  @stringField display_name!: string
  @stringField first_name!: string
  @stringField last_name!: string
  @booleanField is_active: boolean = true
  @booleanField is_superuser!: boolean
  @booleanField is_staff!: boolean
  @enumField({ type: UserRole, many: true }) roles!: UserRole[]

  static $rules = schemaToNaiveRules($UserOut)

  static list() {
    return alovaInst.Get<UserSet>(urls.users.index, { meta: { model: UserSet } })
  }

  static create(data: User) {
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

  resetPassword(data: UserResetPwdIn) {
    return alovaInst.Post(format(urls.users.detail.resetPassword, { id: this.id }), data)
  }
}

export class UserSet extends ModelSet.fromModel(User) {}

export class UserResetPwd extends Model {
  @stringField password!: string
  @stringField confirmPassword!: string

  static $getRules(model: UserResetPwd): FormRules {
    return {
      ...schemaToNaiveRules($UserResetPwdIn),
      confirmPassword: {
        required: true,
        validator: (_, value) => value === model.password,
        message: '两次密码不一致',
        trigger: ['blur']
      }
    }
  }
}

export class UserCreate extends User.include({
  password: StringField.init(),
  confirmPassword: StringField.init()
}) {
  static $getRules(model: UserCreate): FormRules {
    return {
      ...schemaToNaiveRules($UserOut),
      ...UserResetPwd.$getRules(model as unknown as UserResetPwd)
    }
  }
}
