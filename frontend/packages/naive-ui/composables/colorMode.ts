export const useNaiveDarkMode = () => {
  const { colorMode, colorModePreference } = useNaiveColorMode()

  return computed({
    get: () => colorMode.value === 'dark',
    set: (value) => {
      colorModePreference.set(value ? 'dark' : 'light')
    }
  })
}
