import { ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import { useAuthStore } from '@/stores/auth'
import { useStripeStore } from '@/stores/stripe'

const beforeToPageName = ref('')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/blog/IndexView.vue'),
      props: true
    },
    {
      path: '/blog/:id',
      name: 'blog_detail',
      component: () => import('../views/blog/DetailView.vue'),
      props: true
    },
    {
      path: '/signin',
      name: 'sign-in',
      component: () => import('../views/auth/SigninView.vue')
    },
    {
      path: '/signin-redirect',
      name: 'sign-in-redirect',
      component: () => import('../views/auth/SigninRedirectView.vue')
    },
    {
      path: '/signin-google-redirect',
      name: 'sign-in-google-redirect',
      component: () => import('../views/auth/SigninGoogleRedirectView.vue')
    },
    {
      path: '/signout',
      name: 'sign-out',
      component: () => import('../views/auth/SignOutView.vue')
    },
    {
      path: '/signup',
      name: 'sign-up',
      component: () => import('../views/auth/SignUpView.vue')
    },
    {
      path: '/signup-sent-email',
      name: 'sign-up-sent-email',
      component: () => import('../views/auth/SignUpSentEmailView.vue')
    },
    {
      path: '/signup-input',
      name: 'sign-up-input',
      component: () => import('../views/auth/SignUpRegisterInfoView.vue'),
      props: true
    },
    {
      path: '/signup-completion',
      name: 'sign-up-completion',
      component: () => import('../views/auth/SignUpCompletionView.vue')
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('../views/auth/ResetPassword.vue')
    },
    {
      path: '/reset-password-sent-email',
      name: 'reset-password-sent-email',
      component: () => import('../views/auth/ResetPasswordSentEmailView.vue')
    },
    {
      path: '/reset-password-input',
      name: 'reset-password-input',
      component: () => import('../views/auth/ResetPasswordInputView.vue'),
      props: true
    },
    {
      path: '/reset-password-completion',
      name: 'reset-password-completion',
      component: () => import('../views/auth/ResetPasswordCompletionView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/IndexView.vue')
    },
    {
      path: '/admin/payment',
      name: 'admin_payment',
      component: () => import('../views/admin/PaymentView.vue')
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
      path: '/admin/users/:id/edit',
      name: 'admin_users_edit',
      component: () => import('../views/admin/users/EditUsers.vue'),
      props: true
    },
    {
      path: '/admin/users/new',
      name: 'admin_users_new',
      component: () => import('../views/admin/users/NewUsers.vue')
    },
    {
      path: '/admin/images',
      name: 'admin_images',
      component: () => import('../views/admin/images/IndexImages.vue')
    },
    {
      path: '/admin/images/:id/edit',
      name: 'admin_images_edit',
      component: () => import('../views/admin/images/EditImages.vue'),
      props: true
    },
    {
      path: '/admin/images/new',
      name: 'admin_images_new',
      component: () => import('../views/admin/images/NewImages.vue'),
      props: true
    },
    {
      path: '/admin/blogs',
      name: 'admin_blogs',
      component: () => import('../views/admin/blogs/IndexBlogs.vue')
    },
    {
      path: '/admin/blogs/:id/edit',
      name: 'admin_blogs_edit',
      component: () => import('../views/admin/blogs/EditBlogs.vue'),
      props: true
    },
    {
      path: '/admin/blogs/new',
      name: 'admin_blogs_new',
      component: () => import('../views/admin/blogs/NewBlogs.vue')
    },
    {
      path: '/samples',
      name: 'samples',
      component: () => import('../views/samples/IndexView.vue')
    },
    {
      path: '/samples/buttons',
      name: 'samples_buttons',
      component: () => import('../views/samples/ButtonsView.vue')
    },
    {
      path: '/samples/generalmodal',
      name: 'samples_generalmodal',
      component: () => import('../views/samples/ModalGeneralView.vue')
    },
    {
      path: '/samples/ckeditor/classic',
      name: 'samples_ckeditor_classic',
      component: () => import('../views/samples/CkeditorClassicView.vue')
    },
    {
      path: '/samples/ckeditor/inline',
      name: 'samples_ckeditor_inline',
      component: () => import('../views/samples/CkeditorInlineView.vue')
    },
    {
      path: '/samples/ckeditor/balloon',
      name: 'samples_ckeditor_balloon',
      component: () => import('../views/samples/CkeditorBalloonView.vue')
    },
    {
      path: '/samples/media',
      name: 'samples_media',
      component: () => import('../views/samples/MediaView.vue')
    },
    {
      path: '/samples/media-normal',
      name: 'samples_media-normal',
      component: () => import('../views/samples/MediaNormalView.vue')
    },
    {
      path: '/samples/media-alttext',
      name: 'samples_media-alttext',
      component: () => import('../views/samples/MediaAltTextView.vue')
    },
    {
      path: '/samples/media-blur',
      name: 'samples_media-blur',
      component: () => import('../views/samples/MediaBlurView.vue')
    },
    {
      path: '/samples/media-vbg',
      name: 'samples_media-vbg',
      component: () => import('../views/samples/MediaVbgView.vue')
    },
    {
      path: '/samples/audio',
      name: 'samples_audio',
      component: () => import('../views/samples/AudioView.vue')
    },
    {
      path: '/samples/draggable',
      name: 'samples_draggable',
      component: () => import('../views/samples/DraggableView.vue')
    },
    {
      path: '/samples/trial',
      name: 'samples_trial',
      component: () => import('../views/samples/TrialView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const stripeStore = useStripeStore()

  // 前にRedirectしようとしていたページなら、すぐ遷移
  // == stripeStore.getNextPageName()のレスポンスが同じページであるため
  if (beforeToPageName.value !== '' && beforeToPageName.value === to.name) {
    next()
  }

  // 行き先ページが管理者用ページである判定
  const isAdminPage = String(to.name).match(/^admin/) !== null
  // 認証判定
  const isAuthenticated = authStore.isAuthenticated()

  if (isAdminPage && !isAuthenticated) {
    // 管理者用ページへ未認証状態で遷移の場合、ログイン画面へ遷移
    next({ name: 'sign-in' })
  } else if (isAdminPage && isAuthenticated) {
    // サブスクリプション状態 判定
    const nextPageName = await stripeStore.getNextPageName()
    beforeToPageName.value = nextPageName
    if (nextPageName !== '') {
      next({ name: nextPageName })
    }
    next()
  } else {
    // 通常
    next()
  }
})

export default router
