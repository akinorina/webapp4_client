<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const signIn = () => {
  router.push({ name: 'sign-in' })
}
const signOut = () => {
  authStore.signOut()
  router.push({ name: 'sign-out' })
}
const signUp = () => {
  router.push({ name: 'sign-up' })
}
</script>

<template>
  <div>
    <header class="d-flex flex-wrap justify-content-between py-3 mb-4 border-bottom">
      <router-link
        :to="{ name: 'index' }"
        class="d-flex align-items-center me-3 link-body-emphasis text-decoration-none"
      >
        <i class="bi bi-yin-yang me-2" style="font-size: 1.7rem; color: cornflowerblue"></i>
        <span class="fs-4">Webapp4</span>
      </router-link>

      <div class="d-flex justify-content-end col-md-4 text-end" v-if="authStore.isAuthenticated">
        <div class="me-3 mt-2">
          {{ authStore.username }}
        </div>
        <button type="button" class="btn btn-outline-primary" @click="signOut">Sign-out</button>
      </div>
      <div class="d-flex justify-content-end col-md-4 text-end" v-else>
        <button type="button" class="btn btn-outline-primary me-2" @click="signIn">Sign-in</button>
        <button type="button" class="btn btn-primary" @click="signUp">Sign-up</button>
      </div>
    </header>
  </div>
</template>

<style scoped lang="scss"></style>
