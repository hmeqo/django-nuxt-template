export enum Activity {
  inactive,
  active
}

export const activityFilterOptions = [
  {
    label: '有效',
    value: Activity.active
  },
  {
    label: '失效',
    value: Activity.inactive
  }
]

export const activityFilter = (value: Activity, is_active: () => boolean) => {
  if (value === Activity.active && is_active()) return true
  else if (value === Activity.inactive && !is_active()) return true
  return false
}

export function checkUserRole(user: User, role: UserRole) {
  return user.roles.includes(role as UserRole)
}

export function userRoleToText(role: UserRole) {
  switch (role) {
    case UserRole.EMPLOYEE:
      return '员工'
  }
}

export const userRoleOptions = Object.entries(UserRole).map(([k, v]) => ({
  label: userRoleToText(v),
  value: v
}))
