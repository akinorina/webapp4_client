<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const toTop = async () => {
  router.push({ name: 'index' })
}
</script>

<template>
  <div class="container main">
    <div class="container my-3">
      <div class="p-5 mb-3 text-center bg-body-tertiary rounded-3">
        <h1 class="text-body-emphasis mb-3">sign-out しました。</h1>
        <p class="col-lg-8 mx-auto fs-5 text-muted">必要なら再度 sign-in してください。</p>
      </div>
    </div>

    <div class="text-center">
      <button class="btn btn-primary" @click="toTop">Topページへ</button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
