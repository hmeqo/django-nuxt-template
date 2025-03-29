import type { UserOut } from '../lib/sdk'

const loginState = ref({
  user: <UserOut | null>null
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
