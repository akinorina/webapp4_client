<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  console.log('authStore.email   ', authStore.email)
  console.log('authStore.password', authStore.password)
})
</script>

<template>
  <div class="container mx-auto">
    <div class="border p-3">
      <h2 class="font-bold">Samples</h2>
      <p class="text-xs">Trial View - お試し画面</p>
    </div>

    <div class="">おためし。</div>
  </div>
</template>

<style scoped lang="scss"></style>
