const loginState = ref({
  user: <User | null>null
})

export const useLoginState = () => {
  return {
    user: computed(() => loginState.value.user),
    setLoginState: (_state: LoginStateOut) => {
      if (!_state.user) {
        loginState.value.user = null
        return
      }
      loginState.value.user = User.init(_state.user)
    },
    loggedIn: computed(() => !!loginState.value.user)
  }
}
