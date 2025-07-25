<template>
  <NaiveConfigProvider>
    <NGlobalStyle />
    <NaiveProviderBundle>
      <NaiveRequestFeedbackAlova />
      <slot />
    </NaiveProviderBundle>
  </NaiveConfigProvider>
</template>
