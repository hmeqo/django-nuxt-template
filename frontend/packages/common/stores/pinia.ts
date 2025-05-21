// eslint-disable-next-line @typescript-eslint/no-explicit-any
type State = Record<string, any>

export const usePiniaCacheStore = defineStore('cache', {
  state: () => <State>{},
  actions: {
    register<T>(key: string, opts?: { default: () => T }) {
      return computed<T>({
        get: () => this.$state[key] ?? opts?.default?.(),
        set: (v) => {
          this.$state[key] = v
        }
      })
    }
  },
  persist: {
    storage: piniaPluginPersistedstate.localStorage()
  }
})

export const usePiniaCookieStore = defineStore('c', {
  state: () => <State>{},
  actions: {
    register<T>(key: string, opts?: { default: () => T }) {
      return computed<T>({
        get: () => this.$state[key] ?? opts?.default?.(),
        set: (v) => {
          this.$state[key] = v
        }
      })
    }
  },
  persist: {
    storage: piniaPluginPersistedstate.cookies({
      path: '/',
      sameSite: 'lax'
    })
  }
})

export const usePiniaStateStore = defineStore('state', {
  state: () => <State>{},
  actions: {
    register<T>(key: string, opts?: { default: () => T }) {
      let defaultValue
      return computed<T>({
        get: () => this.$state[key] ?? (defaultValue = opts?.default?.()),
        set: (v) => {
          this.$state[key] = v
        }
      })
    }
  },
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage()
  }
})
