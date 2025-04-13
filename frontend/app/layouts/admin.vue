<template>
  <LayoutAdminTemplate
    :menus="[
      {
        label: renderLink('仪表盘', Urls.admin.index),
        key: Urls.admin.index,
        icon: renderIcon({ attr: { class: 'i-material-symbols:dashboard-outline' } })
      },
      {
        label: renderLink('用户', Urls.admin.user.index),
        key: Urls.admin.user.index,
        icon: renderIcon({ attr: { class: 'i-material-symbols:person' } })
      }
    ]"
  >
    <slot />
  </LayoutAdminTemplate>
</template>
