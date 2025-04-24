export const userRoleToText = (role: UserRole): string => {
  const map: Record<UserRole, string> = {
    [UserRole.EMPLOYEE]: '员工'
  }
  return map[role] || role
}

export function materialItemStatusToText(status: MaterialItemStatus) {
  const map: Record<MaterialItemStatus, string> = {
    [MaterialItemStatus.IN_STOCK]: '在库',
    [MaterialItemStatus.OUT_STOCK]: '出库',
    [MaterialItemStatus.MAINTENANCE]: '维修',
    [MaterialItemStatus.SCRAPPED]: '报废'
  }
  return map[status] || status
}

export function stockStatusToText(status: StockStatus) {
  const map: Record<StockStatus, string> = {
    [StockStatus.PENDING]: '待处理',
    [StockStatus.PARTIAL]: '部分',
    [StockStatus.COMPLETED]: '已完成',
    [StockStatus.CANCELLED]: '已取消'
  }
  return map[status] || status
}
