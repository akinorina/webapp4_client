<script setup lang="ts">
import { useRouter } from 'vue-router'

// stores
const router = useRouter()

// functions
const toSignin = () => {
  router.push({ name: 'sign-in', params: {} })
}
</script>

<template>
  <div class="container">
    <div class="my-3">
      <div class="p-5 mb-3 text-center bg-body-tertiary rounded-3">
        <h1 class="text-body-emphasis">Webapp4 ユーザー登録</h1>
        <p class="col-lg-8 mx-auto fs-5 text-muted">メールアドレスを受け取りました。</p>
      </div>
    </div>

    <div class="text-center">
      <p class="col-lg-8 mx-auto fs-5 text-muted">
        送られたメールアドレス宛にメールを送信しました。ご確認ください。
      </p>
    </div>

    <div class="text-center">
      <button class="btn btn-primary" @click="toSignin">Sign-in</button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
