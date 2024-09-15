<script setup lang="ts">
import { useRouter } from 'vue-router'
import ButtonGeneral from '@/components/ui/ButtonGeneral.vue'

const router = useRouter()

const toTop = async () => {
  router.push({ name: 'index' })
}
</script>

<template>
  <div class="container mx-auto">
    <div class="p-3">
      <h1 class="text-center p-2">サインアウトしました。</h1>
    </div>

    <div class="text-center p-3">
      <button-general class="" @click="toTop">Topページへ</button-general>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
