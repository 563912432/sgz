import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Root',
      redirect: '/home'
    },
    {
      path: '/home/:company_id?',
      name: 'Home',
      component: () => import('@/views/home/Home')
      // component: resolve => require(['@/views/home/Home.vue'], resolve)
    },
    {
      path: '/main/:type',
      name: 'Main',
      component: () => import('@/views/main/main')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/views/admin/index')
    },
    {
      path: '/parse/:company_id',
      name: 'Parse',
      component: () => import('@/views/parse/index')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/views/error-page/404')
    }
  ]
})
