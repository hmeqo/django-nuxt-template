import type { StorageLike } from 'pinia-plugin-persistedstate'

export const useAuthState = defineStore('auth-state', {
  state: () => ({
    user: <UserSer | null>null
  }),
  actions: {
    getUser() {
      return this.user!
    },
    setState(state: AuthStateSer) {
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
