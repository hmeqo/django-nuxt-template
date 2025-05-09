import { toString } from 'lodash'

// const stateMap = new Map()

function usePiniaStorage<T>(storage: Storage, key: string, opts?: { default?: () => T }) {
  if (!storage.getItem(key)) storage.setItem(key, toString(opts?.default?.() as T))
  return computed({
    get: () => storage.getItem(key) as T,
    set: (v) => storage.setItem(key, toString(v))
  })
  // if (stateMap.has(key)) return stateMap.get(key) as Ref<T>
  // const state = useState(key, () => (storage.getItem(key) || opts?.default?.() as T))
  // watch(
  //   state,
  //   (v) => {
  //     storage.setItem(key, v)
  //   },
  //   { deep: true, immediate: true }
  // )
  // stateMap.set(key, state)
  // return state
}

export function usePiniaSessionStorage<T>(key: string, opts?: { default?: () => T }) {
  return usePiniaStorage(piniaPluginPersistedstate.sessionStorage(), key, opts)
}

export function usePiniaLocalStorage<T>(key: string, opts?: { default?: () => T }) {
  return usePiniaStorage(piniaPluginPersistedstate.localStorage(), key, opts)
}

export function usePiniaCookies<T>(key: string, opts?: { default?: () => T; maxAge?: number }) {
  return usePiniaStorage(
    piniaPluginPersistedstate.cookies({
      path: '/',
      sameSite: 'lax',
      maxAge: opts?.maxAge
    }),
    key,
    opts
  )
}
