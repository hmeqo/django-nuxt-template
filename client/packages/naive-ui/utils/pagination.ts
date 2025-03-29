import type { PaginationProps } from 'naive-ui'

export function getNaivePagination(opt?: { page?: number; pageSize?: number }): PaginationProps {
  return reactive({
    page: opt?.page ?? undefined,
    showSizePicker: true,
    defaultPageSize: opt?.pageSize ?? 200,
    pageSizes: [5, 10, 15, 30, 50, 75, 100, 200],
    prefix: ({ itemCount }) => h('div', { style: { 'flex-shrink': '0' } }, `总数 ${itemCount}`),
    simple: !responsive.medium
  })
}
