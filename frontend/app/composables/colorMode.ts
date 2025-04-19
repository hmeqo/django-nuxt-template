export const useDarkMode = () => {
  const colorMode = useColorMode()
  return computed({
    get: () => colorMode.value === 'dark',
    set: (v) => (colorMode.preference = v ? 'dark' : 'light')
  })
}
