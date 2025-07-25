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
      return this.user!
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
        useCookie(key, { sameSite: 'lax', maxAge: 60 * 60 * 24 * 3650 }).value = value
      }
    }
  }
})
