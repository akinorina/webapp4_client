<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router';
import ButtonGeneral from '@/components/general/ButtonGeneral.vue';

const router = useRouter()
const authStore = useAuthStore()
</script>

<template>
  <div class="container mx-auto">
    <div class="border p-3">
      <div class="text-xl font-bold">User Page</div>
      <div class="text-sm">各ユーザーのための操作ができます。</div>
    </div>

    <div class="bg-slate-100 p-3">
      <div class="grid grid-cols-3 gap-3">
        <ButtonGeneral class="h-24 px-1 py-3" @click="router.push({ name: 'admin_users' })" v-if="authStore.getUsername() === 'admin'">
          <div class="flex flex-col items-center">
            <h5 class="font-bold leading-5 mb-2">Image</h5>
            <p class="text-xs">ユーザー管理</p>
          </div>
        </ButtonGeneral>

        <ButtonGeneral class="h-24 px-1 py-3" @click="router.push({ name: 'admin_images' })">
          <div class="flex flex-col items-center">
            <h5 class="font-bold leading-5 mb-2">Image</h5>
            <p class="text-xs">画像</p>
          </div>
        </ButtonGeneral>

        <ButtonGeneral class="h-24 px-1 py-3" @click="router.push({ name: 'admin_blogs' })">
          <div class="flex flex-col items-center">
            <h5 class="font-bold leading-5 mb-2">Blog</h5>
            <p class="text-xs">ブログ</p>
          </div>
        </ButtonGeneral>

        <ButtonGeneral class="h-24 px-1 py-3" @click="router.push({ name: 'admin_change-password' })">
          <div class="flex flex-col items-center">
            <h5 class="font-bold leading-5 mb-2">change Password</h5>
            <p class="text-xs">パスワード変更</p>
          </div>
        </ButtonGeneral>

        <ButtonGeneral class="h-24 px-1 py-3" @click="router.push({ name: 'samples' })">
          <div class="flex flex-col items-center">
            <h5 class="font-bold leading-5 mb-2">samples</h5>
            <p class="text-xs">サンプルコード集</p>
          </div>
        </ButtonGeneral>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
