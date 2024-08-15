<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

// stores
const router = useRouter()
const userStore = useUserStore()

// variables
const resultSuccess = ref(false)
const resultFailure = ref(false)

//
onMounted(() => {
  userStore.oldPassword = ''
  userStore.newPassword = ''
})

// functions
const toAdmin = () => {
  router.push({ name: 'admin', params: {} })
}
const submitForm = async () => {
  try {
    await userStore.changePassword()

    resultSuccess.value = true
    setTimeout(() => {
      resultSuccess.value = false
    }, 3000)
  } catch (err) {
    resultFailure.value = true
    setTimeout(() => {
      resultFailure.value = false
    }, 3000)
  }
}
</script>

<template>
  <div class="container">
    <div class="main">
      <div class="alert alert-success" role="alert" v-if="resultSuccess">
        パスワードが変更されました。
      </div>
      <div class="alert alert-danger" role="alert" v-if="resultFailure">
        パスワード変更が失敗しました。
      </div>
      <form class="needs-validation" novalidate @submit.stop.prevent="submitForm">
        <div class="row g-3">
          <div class="col-12">
            <label for="old_password" class="form-label">これまでのパスワード</label>
            <input
              type="text"
              class="form-control"
              id="old_password"
              v-model="userStore.oldPassword"
            />
          </div>

          <div class="col-12">
            <label for="new_password" class="form-label">新しいパスワード</label>
            <input
              type="text"
              class="form-control"
              id="new_password"
              v-model="userStore.newPassword"
            />
          </div>
        </div>

        <div class="mt-3">
          <button type="button" class="btn btn-secondary me-2" @click="toAdmin">戻る</button>
          <button type="submit" class="btn btn-primary">更新</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
