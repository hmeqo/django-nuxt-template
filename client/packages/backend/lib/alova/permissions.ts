export const IsLoggedIn = createPermission(() => useLoginState().loggedIn.value)
export const IsAdmin = createPermission(() => !!useLoginState().user.value?.is_staff)
export const IsSuperuser = createPermission(() => !!useLoginState().user.value?.is_superuser)

export const IsEmployee = createPermission(() => !!useLoginState().user.value?.roles.includes(RolesEnum.EMPLOYEE))

export class FA extends APermission {
  override hasPermission() {
    return new Promise<boolean>((resolve) => {
      const { loggedIn, setLoginState, user } = useLoginState()
      if (loggedIn.value) return resolve(true)

      useAsyncData(() =>
        Auth.loginState()
          .then((data) => setLoginState(data))
          .finally(() => resolve(loggedIn.value))
      )
    })
  }
}
