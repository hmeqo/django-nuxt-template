export const dynamicTrigger = computed(() => (useNaiveDevice().isMobile ? 'click' : 'hover'))
