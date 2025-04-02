<template>
  <LayoutBackgroundTemplate
    :menus="[
      {
        label: renderLink('仪表盘', Urls.admin.index),
        key: Urls.admin.index,
        icon: renderIcon({ attr: { class: 'i-ic:baseline-dashboard' } })
      },
      {
        label: renderLink('Test', Urls.admin.test),
        key: Urls.admin.test,
        icon: renderIcon({ attr: { class: 'i-ic:baseline-dashboard' } })
      }
    ]"
  >
    <slot />
  </LayoutBackgroundTemplate>
</template>
