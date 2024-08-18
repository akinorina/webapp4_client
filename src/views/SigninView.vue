<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { digestMessage } from '@/lib/Functions'

const authStore = useAuthStore()
const router = useRouter()
const showErrorMessage = ref(false)

const passwordRaw = ref('')
watch(passwordRaw, async (newPasswordRaw) => {
  authStore.password = await digestMessage(newPasswordRaw)
})

const submit = async () => {
  try {
    await authStore.signIn()
    router.push({ name: 'admin' })
  } catch (err: any) {
    if (err.response.status === 401) {
      showErrorMessage.value = true
      setTimeout(() => {
        showErrorMessage.value = false
      }, 3000)
    } else {
      throw err
    }
  }
}

const signInGoogle = () => {
  authStore.signInByGoogle()
}
</script>

<template>
  <div class="container main">
    <div class="px-4 py-2 my-2 border rounded">
      <main class="form-signin w-100 m-auto">
        <form @submit.prevent="submit">
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

          <div v-if="showErrorMessage">
            <div class="alert alert-danger" role="alert">
              Email または Password が間違っています。
            </div>
          </div>

          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              v-model="authStore.email"
            />
            <label for="floatingInput">Email</label>
          </div>

          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              v-model="passwordRaw"
            />
            <label for="floatingPassword">Password</label>
          </div>

          <button class="btn btn-primary w-100 py-2" type="submit">Sign-in</button>
        </form>
      </main>
    </div>
    <div class="px-4 py-2 my-2 border rounded">
      <main class="form-signin w-100 m-auto">
        <button class="btn btn-primary w-100" @click="signInGoogle">
          googleアカウントでログイン
        </button>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
// .main {
//   border: 1px red dashed;
// }
</style>
