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
  <header class="container mx-auto flex bg-slate-100">
    <div class="flex-auto" v-if="authStore.isAuthenticated">
      <div class="px-2 py-1 m-1">
        <router-link :to="{ name: 'admin' }">
          <span class="text-xl">Webapp4</span>
        </router-link>
      </div>
    </div>
    <div class="flex-auto" v-else>
      <div class="px-2 py-1 m-1">
        <router-link :to="{ name: 'index' }">
          <span class="text-xl">Webapp4</span>
        </router-link>
      </div>
    </div>

    <div class="flex items-center" v-if="authStore.isAuthenticated">
      <div class="me-2">{{ authStore.username }}</div>
      <button type="button" class="px-2 py-1 m-1 border rounded-md bg-white" @click="signOut">
        Sign-out
      </button>
    </div>
    <div class="flex items-center" v-else>
      <button type="button" class="px-2 py-1 m-1 border rounded-md bg-white" @click="signIn">
        Sign-in
      </button>
      <button type="button" class="px-2 py-1 m-1 border rounded-md bg-white" @click="signUp">
        Sign-up
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss"></style>
