<template>
  <NaiveConfigProvider class="fixed flex flex-col w-full h-full" dark>
    <AppTitlebar />
    <NaiveRequestFeedback />
    <NLayout class="w-full h-full" content-class="flex flex-col justify-center items-center">
      <slot />
    </NLayout>
  </NaiveConfigProvider>
</template>
