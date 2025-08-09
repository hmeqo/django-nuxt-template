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
