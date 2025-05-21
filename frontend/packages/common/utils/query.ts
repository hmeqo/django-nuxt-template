export const qExceptNone = (q: Record<string, string>) => {
  return Object.fromEntries(Object.entries(q).filter(([k, v]) => v))
}
