import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView
    },
    {
      path: '/samples',
      name: 'samples',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/samples/IndexView.vue')
    },
    {
      path: '/samples/generalmodal',
      name: 'samples_generalmodal',
      component: () => import('../views/samples/GeneralModalView.vue')
    },
    {
      path: '/samples/bsmodal',
      name: 'samples_bsmodal',
      component: () => import('../views/samples/BsModalView.vue')
    },
    {
      path: '/signin',
      name: 'sign-in',
      component: () => import('../views/SigninView.vue')
    },
    {
      path: '/signout',
      name: 'sign-out',
      component: () => import('../views/SignOutView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/IndexView.vue')
    }
  ]
})

export default router
