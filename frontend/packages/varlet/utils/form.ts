export const stringNumberConverter = (raw: Record<string, unknown>, key: string) => {
  return computed({
    get: () => (raw[key] as number).toString(),
    set: (value) => {
      raw[key] = Number(value)
    }
  })
}
