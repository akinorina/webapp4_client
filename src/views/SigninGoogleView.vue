<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const resultStatus = ref(false)

onMounted(async () => {
  resultStatus.value = await authStore.signInByGoogleRedirect(route.query)
})

const toUserPage = async () => {
  router.push({ name: 'admin' })
}
const toTop = async () => {
  router.push({ name: 'index' })
}
</script>

<template>
  <div class="container" v-if="resultStatus">
    <div class="container my-3">
      <div class="p-5 mb-3 text-center bg-body-tertiary rounded-3">
        <h1 class="text-body-emphasis mb-3">sign-in-google しました。</h1>
        <p class="col-lg-8 mx-auto fs-5 text-muted">Webapp4 User Page へ進んでください。</p>
      </div>
    </div>

    <div class="text-center">
      <button class="btn btn-primary" @click="toUserPage">Webapp4 User Page</button>
    </div>
  </div>
  <div class="container" v-else>
    <div class="container my-3">
      <div class="p-5 mb-3 text-center bg-body-tertiary rounded-3">
        <h1 class="text-body-emphasis mb-3">sign-in-google に失敗しました。</h1>
        <p class="col-lg-8 mx-auto fs-5 text-muted">ログインをやり直してください。</p>
      </div>
    </div>

    <div class="text-center">
      <button class="btn btn-primary" @click="toTop">Topページへ</button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
