import { ref } from 'vue'
import { defineStore } from 'pinia'
import { axios } from '@/lib/Axios'
import User from '@/lib/User'
import { useStripeStore } from './stripe'

export const useUserStore = defineStore('user', () => {
  const user = ref<User>(new User())
  const users = ref<User[]>([])
  const stripeStore = useStripeStore()

  // パスワード変更用
  const oldPassword = ref('')
  const newPassword = ref('')

  // Emailアドレス確認
  const unverifiedEmail = ref('')

  // パスワード・リセット
  const email = ref('')
  const hash = ref('')

  // ユーザー検索・一覧取得
  async function getUsers() {
    users.value = []
    const options = {}
    const response = await axios.get('/api/users', options)
    users.value = response.data
  }

  // 新規ユーザーデータ生成
  async function newUser() {
    user.value = new User()
  }

  // ユーザー作成
  async function createUser() {
    const options = user.value
    await axios.post('/api/users', options)
  }

  // ユーザー情報 取得
  async function getUser(id: number) {
    user.value = new User()
    const options = {}
    const response = await axios.get('/api/users/' + id, options)
    user.value = new User(response.data)
  }

  // ユーザー更新
  async function updateUser(id: number) {
    const options = user.value
    await axios.put('/api/users/' + id, options)
  }

  // ユーザー削除
  async function deleteUser(id: number) {
    // Stripe 顧客データ検索
    await getUser(id)
    const res = await stripeStore.listCustomersByEmail(user.value.email)
    const targetCustomer = res.customers[0]

    // Stripe 顧客データ削除
    await stripeStore.deleteCustomer(targetCustomer.id)

    // ユーザーデータ削除
    const options = {}
    await axios.delete('/api/users/' + id, options)
  }

  // メールアドレス確認 - メール送信
  async function sendVerifyingEmail(action: 'sign-up' | 'reset-password') {
    const options = {
      email: unverifiedEmail.value,
      action: action
    }
    await axios.post('/api/users/send-verifying-email', options)
  }

  // メールアドレス確認 - メールアドレス検証
  async function checkVerifyingEmail(email: string, hash: string) {
    // options
    const options = {
      email: email,
      hash: hash
    }
    await axios.post('/api/users/check-verifying-email', options)
  }

  // リセット・パスワード
  async function resetPassword() {
    const options = {
      email: email.value,
      hash: hash.value,
      password: newPassword.value
    }
    await axios.post('/api/users/reset-password', options)
  }

  // パスワード変更
  async function changePassword() {
    const options = {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    }
    await axios.put('/api/users/change-password', options)
  }

  // ユーザー登録
  async function registerUser() {
    await axios.post('/api/users/register-user', user.value)
  }

  return {
    user,
    users,
    oldPassword,
    newPassword,
    unverifiedEmail,
    email,
    hash,
    getUsers,
    getUser,
    newUser,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
    sendVerifyingEmail,
    checkVerifyingEmail,
    registerUser,
    resetPassword
  }
})
