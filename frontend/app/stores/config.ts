type Config = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cache: Record<string, any>
}

export const useConfigStore = defineStore('config', {
  state: (): Config => ({
    cache: {}
  }),
  actions: {
    clearCache() {
      this.cache = {}
    }
  },
  persist: {
    storage: piniaPluginPersistedstate.localStorage()
  }
})
