import type { StorageLike } from 'pinia-plugin-persistedstate'

type LoginState = {
  user: UserSer | null
}

export const useLoginState = defineStore('login-state', {
  state: (): LoginState => ({
    user: null
  }),
  actions: {
    get() {
      return User.init(this.user || {})
    },
    set(user: UserSer) {
      this.user = user
    },
    isLoggedIn() {
      return !!this.user
    }
  },
  persist: {
    storage: <StorageLike>{
      getItem(key) {
        return useCookie(key).value
      },
      setItem(key, value) {
        useCookie(key).value = value
      }
    }
  }
})
