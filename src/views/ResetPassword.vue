<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { AxiosError } from 'axios'

// stores
const router = useRouter()
const userStore = useUserStore()

const showErrorAlert = ref(false)

// lifecycle
onMounted(() => {
  userStore.unverifiedEmail = ''
})

// functions
const toIndex = () => {
  router.push({ name: 'index', params: {} })
}
const submitForm = async () => {
  try {
    await userStore.verifyingEmail('/reset-password-input')
    router.push({ name: 'reset-password-sent-email' })
  } catch (err) {
    if (err instanceof AxiosError) {
      showErrorAlert.value = true
      setTimeout(() => {
        showErrorAlert.value = false
      }, 3000)
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="my-3">
      <div class="p-5 mb-3 text-center bg-body-tertiary rounded-3">
        <h1 class="text-body-emphasis">Webapp4 パスワードのリセット</h1>
        <p class="col-lg-8 mx-auto fs-5 text-muted">
          パスワードのリセット手続きに入ります。<br />
          メールアドレスを入力してください。
        </p>
      </div>
    </div>

    <div v-if="showErrorAlert">
      <div class="alert alert-danger" style="line-height: 1rem" role="alert">
        <p class="fw-bold">入力データに不備があります。</p>
      </div>
    </div>

    <div class="main">
      <form class="needs-validation" novalidate @submit.prevent="submitForm">
        <div class="row g-3">
          <div class="col-12">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="userStore.unverifiedEmail"
            />
          </div>
        </div>

        <div class="mt-3">
          <button type="submit" class="btn btn-primary me-2">メールアドレス送信</button>
          <button type="button" class="btn btn-secondary me-2" @click="toIndex">Topへ戻る</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
