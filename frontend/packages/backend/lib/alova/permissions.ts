let authCached = false

const fetchMe = createPermission(() => {
  const loginState = useLoginState()

  if (!authCached)
    Auth.me()
      .then((data) => {
        if (data) {
          loginState.set(data)
        } else {
          loginState.$reset()
          navigateTo(LoginUrl)
        }
      })
      .catch(() => {})
      .finally(() => (authCached = true))

  return loginState.isLoggedIn()
})

export const isLoggedIn = createPermission(() => fetchMe.hasPermission() && useLoginState().isLoggedIn())
export const isAuthenticated = isLoggedIn
export const isStaff = createPermission(() => fetchMe.hasPermission() && !!useLoginState().user?.is_staff)
export const isSuperuser = createPermission(() => fetchMe.hasPermission() && !!useLoginState().user?.is_superuser)

export const isEmployee = createPermission(
  () => fetchMe.hasPermission() && !!useLoginState().user?.roles.includes(UserRole.EMPLOYEE)
)
