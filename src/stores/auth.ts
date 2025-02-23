import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { axios } from '@/lib/Axios'
import Profile from '@/lib/Profile'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  // Sign-in 変数
  const email = ref('')
  const password = ref('')

  // Profile
  const profile = ref<Profile>(new Profile())

  // setInterval ID. : Sign-in 有効期限が過ぎたら Sign-out 処理実行
  let iID: number = 0

  // restore from localStorage
  if (localStorage.getItem('access_token')) {
    const jsonLsData = localStorage.getItem('access_token')
    axios.defaults.headers['Authorization'] = 'Bearer ' + jsonLsData
  }
  if (localStorage.getItem('auth') === null) {
    profile.value.clear()
  } else {
    const jsonLsData = localStorage.getItem('auth') as string
    profile.value = new Profile(JSON.parse(jsonLsData))
  }

  // 時間切れ処理 on reload.
  if (isAuthenticated()) {
    setTimeoutProc()
  }

  // ユーザー表示名 取得
  function getUsername() {
    return profile.value.username
  }

  // サインイン有効期限内 判定
  function isAuthenticated() {
    const availableProfile = profile.value.exp !== 0
    const availableTime = dayjs().isBefore(dayjs(profile.value.exp))
    return availableProfile && availableTime
  }

  async function signIn() {
    // sign-in
    const signinData = {
      email: email.value,
      password: password.value
    }
    const res = await axios.post('/api/auth/signin', signinData)
    axios.defaults.headers['Authorization'] = 'Bearer ' + res.data.access_token
    localStorage.setItem('access_token', res.data.access_token)

    // profle情報取得
    await getProfile()
    localStorage.setItem('auth', JSON.stringify(profile.value))

    // 時間切れ処理
    setTimeoutProc()
  }

  async function resignIn() {
    // 再sign-in
    const signinData = {
      email: email.value,
      password: password.value
    }
    const res = await axios.post('/api/auth/resignin', signinData)
    axios.defaults.headers['Authorization'] = 'Bearer ' + res.data.access_token
    localStorage.setItem('access_token', res.data.access_token)

    // profle情報取得
    await getProfile()

    // save to localStorage
    localStorage.setItem('auth', JSON.stringify(profile.value))

    // 時間切れ処理
    setTimeoutProc()
  }

  async function signInByGoogle() {
    location.href = '/api/auth/signin-google'
  }

  async function signInByGoogleRedirect(query: any) {
    // access_token 設定
    if (query.access_token === 'no_user_from_google') {
      return false // Sign-in failure
    }
    axios.defaults.headers['Authorization'] = 'Bearer ' + query.access_token
    localStorage.setItem('access_token', query.access_token)

    // profle情報取得
    await getProfile()

    // save to localStorage
    localStorage.setItem('auth', JSON.stringify(profile.value))

    // 時間切れ処理
    setTimeoutProc()

    return true // Sign-in ok
  }

  async function signOut() {
    // sign-out
    await axios.post('/api/auth/signout', {})
    // reset values
    axios.defaults.headers['Authorization'] = null
    profile.value.clear()
    clearInterval(iID)
    localStorage.removeItem('auth')
  }

  async function getProfile(): Promise<void> {
    const res = await axios.get('/api/auth/profile')
    profile.value = new Profile(res.data)
  }

  function hasRole(roleName: string): boolean {
    return profile.value.roles.includes(roleName)
  }

  // トークン発行日時の取得
  function getIssuedAt(): string {
    return dayjs(profile.value.iat).format('YYYY-MM-DD HH:mm:ss')
  }
  // トークン有効期限日時の取得
  function getExpiredTime(): string {
    return dayjs(profile.value.exp).format('YYYY-MM-DD HH:mm:ss')
  }

  // 残り時間 (msec.)
  async function getSigninTimeRemaining() {
    return dayjs(profile.value.exp).diff(dayjs().valueOf(), 'milliseconds')
  }

  // 1秒ごとに、Sign-in有効期限を過ぎたら Sign-out 処理実行
  function setTimeoutProc() {
    // 時間切れ処理
    iID = window.setInterval(() => {
      if (!isAuthenticated() && profile.value.exp !== 0) {
        // profileがクリアされておらず、無効な状態だったら、Sign-out処理実行
        signOut()
        router.push({ name: 'sign-out' })
      }
    }, 1000)
  }

  return {
    email,
    password,
    profile,
    getUsername,
    isAuthenticated,
    hasRole,
    signIn,
    signInByGoogle,
    signInByGoogleRedirect,
    resignIn,
    signOut,
    getProfile,
    getIssuedAt,
    getExpiredTime,
    getSigninTimeRemaining
  }
})
