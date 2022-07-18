import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index.vue')
    },
    {
      path: '/home/detail',
      name: 'detail',
      component: () => import('@/views/home/detail.vue')
    },
    {
      path: '/*',
      redirect: '/'
    }
  ]
})
