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
    <div class="p-2">
      <h1 class="text-xl font-bold">Webapp4 ユーザー登録</h1>
      <p class="">いただいたメールアドレス宛にメールを送信しました。</p>
      <p>内容をご確認いただき、登録の続きを行なってください。</p>
    </div>

    <div class="p-2">
      <ButtonGeneral type="submit" class="rounded-md border px-2 py-1" @click="toSignin">
        Sign-in ページへ戻る
      </ButtonGeneral>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
