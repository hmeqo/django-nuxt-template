const IsLoggedIn = createPermission(
  (() => {
    let authCached = false
    return () => {
      const loginState = useLoginState()

      if (!authCached)
        AuthSrv.loginState()
          .then((data) => loginState.setState(data))
          .catch((res) => {
            if (res.status !== 401) return
            loginState.$reset()
            if (useRoute().path !== getLoginUrl()) redirectTo(getLoginUrl())
          })
          .finally(() => (authCached = true))

      return loginState.isLoggedIn()
    }
  })()
)

export const IsAuthenticated = IsLoggedIn
export const IsSuperUser = createPermission(() => IsLoggedIn.verify() && !!useLoginState().user?.is_superuser)
export const IsStaff = createPermission(() => IsSuperUser.verify() || !!useLoginState().user?.is_staff)
