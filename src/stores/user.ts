import { ref } from 'vue'
import { defineStore } from 'pinia'
import { axios } from '@/lib/Axios'
import User from '@/lib/User'
import { digestMessage } from '@/lib/Functions'

export const useUserStore = defineStore('user', () => {
  const user = ref<User>(new User())
  const users = ref<User[]>([])

  // パスワード変更用
  const oldPassword = ref('')
  const newPassword = ref('')

  // Emailアドレス確認
  const unverifiedEmail = ref('')

  async function getUsers() {
    users.value = []
    const options = {}
    const response = await axios.get('/api/users', options)
    users.value = response.data
  }

  async function newUser() {
    user.value = new User()
  }

  async function createUser() {
    const options = user.value
    await axios.post('/api/users', options)
  }

  async function getUser(id: number) {
    user.value = new User()
    const options = {}
    const response = await axios.get('/api/users/' + id, options)
    user.value = new User(response.data)
  }

  async function updateUser(id: number) {
    const options = user.value
    await axios.put('/api/users/' + id, options)
  }

  async function deleteUser(id: number) {
    const options = {}
    await axios.delete('/api/users/' + id, options)
  }

  async function changePassword() {
    const oldPw = await digestMessage(oldPassword.value)
    const newPw = await digestMessage(newPassword.value)

    const options = {
      oldPassword: oldPw,
      newPassword: newPw
    }
    await axios.put('/api/users/change-password', options)
  }

  async function verifyinngEmail() {
    // メールアドレス送信
    const options = {
      email: unverifiedEmail.value
    }
    const result = await axios.post('/api/users/verifing-email', options)
    console.debug('result', result)
  }

  async function registerUser() {
    console.log('--- registerUser() ---')
    console.log('user', user.value)

    // ユーザー登録
    const result = await axios.post('/api/users/register-user', user.value)
    console.debug('result', result)
  }
  return {
    user,
    users,
    oldPassword,
    newPassword,
    unverifiedEmail,
    getUsers,
    getUser,
    newUser,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
    verifyinngEmail,
    registerUser
  }
})
