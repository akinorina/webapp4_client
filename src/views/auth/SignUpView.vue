<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { AxiosError } from 'axios'
import { digestMessage } from '@/lib/Functions'

// stores
const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const passwordRaw = ref('')
watch(passwordRaw, async (newPasswordRaw) => {
  user.value.password = await digestMessage(newPasswordRaw)
})

const showErrorAlert = ref(false)

// lifecycle
onMounted(() => {
  userStore.newUser()
})

// functions
const toIndex = () => {
  router.push({ name: 'index', params: {} })
}
const submitForm = async () => {
  try {
    await userStore.verifyingEmail('/signup-register-info')
    router.push({ name: 'sign-up-sent-email' })
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
        <h1 class="text-body-emphasis">Webapp4 ユーザー登録</h1>
        <p class="col-lg-8 mx-auto fs-5 text-muted">
          ユーザー登録ページです。<br />
          次の各項目を入力して登録ボタンを押してください。
        </p>
      </div>
    </div>

    <div v-if="showErrorAlert">
      <div class="alert alert-danger" style="line-height: 1rem" role="alert">
        <p class="fw-bold">入力データに不備があります。</p>
        <p>メールアドレスが既に登録済みの場合があります。</p>
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
