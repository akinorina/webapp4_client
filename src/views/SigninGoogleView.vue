<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

onMounted(() => {
  authStore.signInByGoogleRedirect(route.query)
})

const toTop = async () => {
  router.push({ name: 'index' })
}
</script>

<template>
  <div class="container main">
    <div class="container my-3">
      <div class="p-5 mb-3 text-center bg-body-tertiary rounded-3">
        <h1 class="text-body-emphasis mb-3">sign-in-google しました。</h1>
        <p class="col-lg-8 mx-auto fs-5 text-muted">ok?</p>
      </div>
    </div>

    <div class="text-center">
      <button class="btn btn-primary" @click="toTop">Topページへ</button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
