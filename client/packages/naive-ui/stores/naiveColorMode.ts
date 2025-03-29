export const useNaiveDarkMode = () => {
  const { colorMode, colorModePreference } = useNaiveColorMode()
  return computed({
    get: () => colorMode.value === 'dark',
    set: (v) => colorModePreference.set(v ? 'dark' : 'light')
  })
}
