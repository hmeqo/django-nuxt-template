type LoginState = {
  user: UserOut | null
}

export const useLoginState = defineStore('login-state', {
  state: (): LoginState => ({
    user: null
  }),
  actions: {
    get() {
      return User.init(this.user || {})
    },
    set(user: UserOut) {
      this.user = user
    },
    isLoggedIn() {
      return !!this.user?.id
    }
  },
  persist: {
    storage: piniaPluginPersistedstate.cookies()
  }
})
