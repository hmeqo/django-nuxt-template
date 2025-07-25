let authCached = false

const checkLoginState = createPermission(() => {
  const loginState = useLoginState()

  if (!authCached)
    AuthSrv.loginState()
      .then((data) => {
        if (data) {
          loginState.set(data.user)
        } else {
          loginState.$reset()
          if (useRoute().path !== getLoginUrl()) redirectTo(getLoginUrl())
        }
      })
      .catch(() => {})
      .finally(() => (authCached = true))

  return loginState.isLoggedIn()
})

export const IsLoggedIn = createPermission(() => checkLoginState.verify() && useLoginState().isLoggedIn())
export const IsAuthenticated = IsLoggedIn
export const IsSuperUser = createPermission(() => checkLoginState.verify() && !!useLoginState().user?.is_superuser)
export const IsStaff = createPermission(() => IsSuperUser.verify() || !!useLoginState().user?.is_staff)
