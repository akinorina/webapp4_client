<script setup lang="ts">
import { useRouter } from 'vue-router'
import ButtonGeneral from '@/components/general/ButtonGeneral.vue'

// stores
const router = useRouter()

// functions
const toSignin = () => {
  router.push({ name: 'sign-in', params: {} })
}
</script>

<template>
  <div class="container mx-auto">
    <div class="border p-3">
      <h1 class="">ユーザー登録</h1>
      <p class="">ユーザー登録が完了しました。</p>
    </div>

    <div class="mt-2 border p-3">
      <ButtonGeneral class="" @click="toSignin">サインイン</ButtonGeneral>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
