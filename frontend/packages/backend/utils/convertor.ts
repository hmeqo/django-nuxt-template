export const stringNumberConverter = (raw: Record<string, unknown>, key: string) => {
  return computed({
    get: () => (raw[key] as number).toString(),
    set: (value) => {
      raw[key] = Number(value)
    }
  })
}

export const numberISODatetimeConverter = (raw: Record<string, unknown>, key: string) => {
  return computed({
    get: () => new Date(raw[key] as Date).getTime(),
    set: (value) => {
      raw[key] = new Date(value).toISOString()
    }
  })
}
