export const useDarkMode = () => {
  const colorMode = useColorMode()

  return computed<boolean>({
    get: () => {
      if (colorMode.preference === 'system') return true
      return colorMode.preference === 'dark'
    },
    set: (value) => {
      colorMode.preference = value ? 'dark' : 'light'
    }
  })
}
