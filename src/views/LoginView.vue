<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const submit = async () => {
  await authStore.login()
  router.push({ name: 'admin' })
}
</script>

<template>
  <div class="container main">
    <div class="px-4 py-2 my-2 border rounded">
      <main class="form-signin w-100 m-auto">
        <form @submit.prevent="submit">
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

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

          <button class="btn btn-primary w-100 py-2" type="submit">Login</button>
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
