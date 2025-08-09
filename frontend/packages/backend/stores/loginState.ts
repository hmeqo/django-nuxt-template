import type { StorageLike } from 'pinia-plugin-persistedstate'

type LoginState = {
  user: UserSer | null
}

export const useLoginState = defineStore('login-state', {
  state: (): LoginState => ({
    user: null
  }),
  actions: {
    getUser() {
      return this.user!
    },
    setState(state: LoginStateSer) {
      this.user = state.user
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
