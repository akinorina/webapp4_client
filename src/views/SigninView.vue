<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const showErrorMessage = ref(false)

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
</script>

<template>
  <div class="container main">
    <div class="px-4 py-2 my-2 border rounded">
      <main class="form-signin w-100 m-auto">
        <form @submit.prevent="submit">
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

          <div v-if="showErrorMessage">
            <div class="alert alert-danger" role="alert">
              Username または Password が間違っています。
            </div>
          </div>

          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              v-model="authStore.username"
            />
            <label for="floatingInput">Username</label>
          </div>

          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              v-model="authStore.password"
            />
            <label for="floatingPassword">Password</label>
          </div>

          <button class="btn btn-primary w-100 py-2" type="submit">Sign-in</button>
        </form>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
// .main {
//   border: 1px red dashed;
// }
</style>
