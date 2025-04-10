<template>
  <LayoutAdminTemplate
    :menus="[
      {
        label: renderLink('仪表盘', Urls.admin.index),
        key: Urls.admin.index,
        icon: renderIcon({ attr: { class: 'i-ic:baseline-dashboard' } })
      },
      {
        label: renderLink('用户', Urls.admin.user),
        key: Urls.admin.user,
        icon: renderIcon({ attr: { class: 'i-ic:baseline-dashboard' } })
      }
    ]"
  >
    <slot />
  </LayoutAdminTemplate>
</template>
