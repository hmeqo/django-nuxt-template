export const userRoleToText = (role: UserRole): string => {
  const map: Record<UserRole, string> = {
    [UserRole.EMPLOYEE]: '员工'
  }
  return map[role] || role
}
