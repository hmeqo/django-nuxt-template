<template>
  <NaiveConfigProvider class="fixed w-full h-full" dark>
    <NaiveRequestFeedback />
    <NLayout class="w-full h-full" content-class="flex flex-col justify-center items-center">
      <slot />
    </NLayout>
  </NaiveConfigProvider>
</template>
