import Layout from '@/layout'
export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees/index.vue'),
      meta: { title: '员工管理', icon: 'people' }
    },
    {
      path: '/employees/details/:id',
      component: () => import('@/views/employees/Details.vue'),
      hidden: true
    },
    {
      path: '/employees/print/:id',
      component: () => import('@/views/employees/Print.vue'),
      hidden: true
    }
  ]
}
