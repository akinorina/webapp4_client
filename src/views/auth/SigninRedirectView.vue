<script setup lang="ts">
import { useRouter } from 'vue-router'
import ButtonGeneral from '@/components/general/ButtonGeneral.vue'

const router = useRouter()

const toUserPage = () => {
  router.push({ name: 'admin' })
}
</script>
<template>
  <div class="container mx-auto">
    <div class="border">
      <div>
        <div class="border p-3">
          <div class="">サインインしました。</div>
          <div class="">Userページへ進んでください。</div>
        </div>

        <div class="border p-3 text-center">
          <ButtonGeneral class="" @click="toUserPage">Userページ</ButtonGeneral>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
