const stateMap = new Map()

export const usePiniaSessionStorage = <T>(_key: string, defaultValue: () => T) => {
  const key = `session-storage-${_key}`
  if (stateMap.has(key)) return stateMap.get(key) as Ref<T>
  const storage = piniaPluginPersistedstate.sessionStorage()
  const state = useState(key, () => {
    const value = storage.getItem(key)
    return value !== null ? <T>JSON.parse(value) : defaultValue()
  })
  watch(
    state,
    (v) => {
      storage.setItem(key, JSON.stringify(v))
    },
    { deep: true }
  )
  stateMap.set(key, state)
  return state
}

export const usePiniaLocalStorage = <T extends string>(_key: string, defaultValue: T) => {
  const key = `local-storage-${_key}`
  if (stateMap.has(key)) return stateMap.get(key) as Ref<T>
  const storage = piniaPluginPersistedstate.localStorage()
  const state = useState(key, () => {
    const value = storage.getItem(key)
    return value !== null ? <T>JSON.parse(value) : defaultValue
  })
  watch(
    state,
    (v) => {
      storage.setItem(key, JSON.stringify(v))
    },
    { deep: true }
  )
  stateMap.set(key, state)
  return state
}
