import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { axios } from '@/lib/Axios'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  const username = ref('')
  const password = ref('')
  const name = ref('')
  const iat = ref(0)
  const exp = ref(0)
  const isAuthenticated = ref(false)
  let iID: number = 0

  async function signIn() {
    // sign-in
    const signinData = {
      username: username.value,
      password: password.value
    }
    const res = await axios.post('/api/auth/signin', signinData)
    axios.defaults.headers['Authorization'] = 'Bearer ' + res.data.access_token

    // get profle
    const res2 = await getProfile()
    name.value = res2.data.name
    iat.value = res2.data.iat * 1000
    exp.value = res2.data.exp * 1000
    isAuthenticated.value = dayjs().isBefore(dayjs(exp.value))

    // 時間切れ処理
    iID = window.setInterval(() => {
      isAuthenticated.value = dayjs().isBefore(dayjs(exp.value))
      if (!isAuthenticated.value) {
        clearInterval(iID)
        router.push({ name: 'sign-out' })
      }
    }, 1000)
  }

  async function signOut() {
    // sign-out
    await axios.post('/api/auth/signout', {})
    // reset values
    axios.defaults.headers['Authorization'] = null
    isAuthenticated.value = false
    name.value = ''
    iat.value = dayjs().valueOf()
    exp.value = 0
    clearInterval(iID)
  }

  async function getProfile() {
    return await axios.get('/api/auth/profile')
  }

  function getExpiredTime(): string {
    return dayjs(exp.value).format('YYYY-MM-DD HH:mm:ss')
  }

  return {
    username,
    password,
    name,
    signIn,
    signOut,
    getProfile,
    isAuthenticated,
    getExpiredTime
  }
})
