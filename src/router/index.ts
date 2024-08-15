import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import { useAuthStore } from '@/stores/auth'

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
      path: '/signup',
      name: 'sign-up',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/signup/complete',
      name: 'sign-up_complete',
      component: () => import('../views/SignUpCompleteView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/IndexView.vue')
    },
    {
      path: '/admin/change-password',
      name: 'admin_change-password',
      component: () => import('../views/admin/ChangePasswordView.vue')
    },
    {
      path: '/admin/users',
      name: 'admin_users',
      component: () => import('../views/admin/users/IndexUsers.vue')
    },
    {
      path: '/admin/users/:id',
      name: 'admin_users_detail',
      component: () => import('../views/admin/users/DetailUsers.vue'),
      props: true
    },
    {
      path: '/admin/users/:id/edit',
      name: 'admin_users_edit',
      component: () => import('../views/admin/users/EditUsers.vue'),
      props: true
    },
    {
      path: '/admin/users/new',
      name: 'admin_users_new',
      component: () => import('../views/admin/users/NewUsers.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // 行き先ページが管理者用ページである判定
  const isAdminPage = String(to.name).match(/^admin/) !== null

  if (isAdminPage && !authStore.isAuthenticated) {
    // 管理者用ページへ未認証状態で遷移の場合、ログイン画面へ遷移
    next({ name: 'sign-in' })
  } else {
    // 通常
    next()
  }
})

export default router
