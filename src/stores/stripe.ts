import { ref } from 'vue'
import { defineStore } from 'pinia'
import { axios } from '@/lib/Axios'
import Webapp4Error from '@/lib/Webapp4Error'
import { useAuthStore } from './auth'

export const useStripeStore = defineStore('stripe', () => {
  const authStore = useAuthStore()
  const targetCustomer = ref()

  // env
  const bUseStripe = (import.meta.env.VITE_USE_STRIPE as string) === 'true'

  /**
   * config情報取得
   */
  async function getConfig() {
    try {
      const options = {}
      const res = await axios.get('/api/stripe/config', options)
      return res.data
    } catch (err: any) {
      throw new Webapp4Error({ type: 'system', message: err.message })
    }
  }

  /**
   * Prices取得
   */
  async function listPrices() {
    try {
      const options = {}
      const res = await axios.post('/api/stripe/list-prices', options)
      return res.data
    } catch (err: any) {
      throw new Webapp4Error({ type: 'system', message: err.message })
    }
  }

  /**
   * Customer(顧客)の作成
   */
  async function createCustomer(name: string, email: string) {
    try {
      const options = { name: name, email: email }
      const res = await axios.post('/api/stripe/create-customer', options)
      return res.data
    } catch (err: any) {
      throw new Webapp4Error({ type: 'system', message: err.message })
    }
  }

  /**
   * Customer(顧客)の更新
   */
  async function updateCustomer(customerId: string, updateData: any) {
    try {
      const options = {}
      const res = await axios.post('/api/stripe/update-customer/' + customerId, updateData, options)
      return res.data
    } catch (err: any) {
      throw new Webapp4Error({ type: 'system', message: err.message })
    }
  }

  /**
   * Customer(顧客)の削除
   */
  async function deleteCustomer(customerId: string) {
    try {
      return await axios.post('/api/stripe/delete-customer/' + customerId)
    } catch (err: any) {
      throw new Webapp4Error({ type: 'system', message: err.message })
    }
  }

  /**
   * Customer(顧客) 一覧取得
   */
  async function listCustomersByEmail(email: string) {
    try {
      const options = { email: email }
      const res = await axios.post('/api/stripe/list-customers-by-email', options)
      return res.data
    } catch (err: any) {
      throw new Webapp4Error({ type: 'system', message: err.message })
    }
  }

  /**
   * Subscription(サブスクリプション)の作成
   */
  async function createSubscription(customerId: string, priceId: string) {
    try {
      const options = {
        customerId: customerId,
        priceId: priceId
      }
      const res = await axios.post('/api/stripe/create-subscription', options)
      return res.data
    } catch (err: any) {
      throw new Webapp4Error({ type: 'system', message: err.message })
    }
  }

  /**
   * Subscription(サブスクリプション) - 一覧取得
   */
  async function listSubscriptionByCustomer(
    customerId: string,
    status: string | undefined = undefined
  ) {
    try {
      const options = { customerId: customerId, status: status }
      const res = await axios.post('/api/stripe/list-subscriptions-by-customer', options)
      return res.data
    } catch (err: any) {
      throw new Webapp4Error({ type: 'system', message: err.message })
    }
  }

  /**
   * Subscription(サブスクリプション) - キャンセル
   */
  async function cancelSubscription(subscriptionId: string) {
    try {
      const options = {}
      const res = await axios.post('/api/stripe/cancel-subscription/' + subscriptionId, options)
      return res
    } catch (err: any) {
      throw new Webapp4Error({ type: 'system', message: err.message })
    }
  }

  /**
   * Invoices(請求書) - 一覧取得
   */
  async function listInvoicesBySubscription(subscriptionId: string) {
    try {
      const options = { subscriptionId: subscriptionId }
      const response = await axios.post('/api/stripe/list-invoices-by-subscription', options)
      return response.data
    } catch (err: any) {
      throw new Webapp4Error({ type: 'system', message: err.message })
    }
  }

  /**
   * Active Entitlement 一覧取得
   */
  async function listActiveEntitlementsByCustomer(customerId: string) {
    try {
      const options = { customerId: customerId }
      const response = await axios.post('/api/stripe/list-active-entitlements-by-customer', options)
      return response.data
    } catch (err: any) {
      throw new Webapp4Error({ type: 'system', message: err.message })
    }
  }

  /**
   * PaymentMethod 一覧取得
   */
  async function listPaymentMethodsByCustomer(customerId: string) {
    try {
      const options = { customerId: customerId }
      const response = await axios.post('/api/stripe/list-payment-method-by-customer', options)
      return response.data
    } catch (err: any) {
      throw new Webapp4Error({ type: 'system', message: err.message })
    }
  }

  /**
   * Subscription(サブスクリプション)の作成
   */
  async function createSetupIntent(customerId: string) {
    try {
      const options = { customerId: customerId }
      const res = await axios.post('/api/stripe/create-setup-intent-by-customer', options)
      return res.data
    } catch (err: any) {
      throw new Webapp4Error({ type: 'system', message: err.message })
    }
  }

  /**
   * サブスクリプション登録状態・active状態から遷移先を返す
   */
  async function getNextPageName() {
    if (!bUseStripe) {
      return ''
    }

    // profile
    await authStore.getProfile()

    // email で customer を検索し、存在しない場合はサブスクリプション登録ページへ遷移
    const listCustomers = await listCustomersByEmail(authStore.profile.email)
    if (listCustomers.customers.length === 0) {
      // サブスクリプション: 未登録
      return 'admin_payment'
    } else {
      // サブスクリプション: 登録済み(active以外も含む)
      targetCustomer.value = listCustomers.customers[0]
      const activeEntitlement = await listActiveEntitlementsByCustomer(targetCustomer.value.id)
      const found = activeEntitlement.activeEntitlements.findIndex((item: any) => {
        return item.lookup_key === 'meeting_light'
      })
      if (found === -1) {
        // サブスクリプション: not active
        return 'admin_payment'
      } else {
        // サブスクリプション: active
        return ''
      }
    }
  }

  return {
    getConfig,
    listPrices,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    listCustomersByEmail,
    createSubscription,
    listSubscriptionByCustomer,
    cancelSubscription,
    listInvoicesBySubscription,
    listActiveEntitlementsByCustomer,
    listPaymentMethodsByCustomer,
    createSetupIntent,
    getNextPageName
  }
})
