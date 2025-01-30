<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useImagePublicStore } from '@/stores/imagePublic'
import ButtonGeneral from '@/components/general/ButtonGeneral.vue';

const router = useRouter()
const imagePublicStore = useImagePublicStore()

const pathPrefix = import.meta.env.VITE_STORAGE_PATH_PREFIX

onMounted(() => {
  imagePublicStore.getImages()
})
</script>

<template>
  <div class="container mx-auto">
    <div class="border p-3">
      <div class="text-xs">
        Web アプリケーション テンプレート ver.4 です。<br />
        Database, SMTP, ObjectStorage などのミドルウェアとともに動作します。<br />
        NestJSのRestAPI サーバー、および、Vue3 による クライアント により実現してます。
      </div>
    </div>

    <div class="m-1">

      <div class="py-3">
        <ButtonGeneral class="w-full my-0" @click="router.push({ name: 'admin' })">
          <div class="">
            <div class="text-xl font-bold">User Page</div>
            <div class="text-xs">登録ユーザー用のページへ遷移。</div>
          </div>
        </ButtonGeneral>
      </div>

      <div class="py-3">
        <ButtonGeneral class="w-full my-0" @click="router.push({ name: 'samples' })">
          <div class="">
            <div class="text-xl font-bold">Samples</div>
            <div class="text-xs">各種機能のサンプルページ。</div>
          </div>
        </ButtonGeneral>
      </div>

      <div class="py-3">
        <ButtonGeneral class="w-full my-0" @click="router.push({ name: 'blog' })">
          <div class="">
            <div class="text-xl font-bold">Blog</div>
            <div class="text-xs">ブログ閲覧ページ</div>
          </div>
        </ButtonGeneral>
      </div>



      <!--
      <div class="grid grid-cols-2 gap-3">
        <div class="rounded border bg-slate-100 p-3">
          <router-link :to="{ name: 'admin' }" class="">
            <div class="">
              <div class="text-xl font-bold">User Page</div>
              <div class="text-xs">登録ユーザー用のページへ遷移。</div>
            </div>
          </router-link>
        </div>

        <div class="rounded border bg-slate-100 p-3">
          <router-link :to="{ name: 'samples' }" class="">
            <div class="">
              <div class="text-xl font-bold">Samples</div>
              <div class="text-xs">各種機能のサンプルページ。</div>
            </div>
          </router-link>
        </div>

        <div class="rounded border bg-slate-100 p-3">
          <router-link :to="{ name: 'blog' }" class="">
            <div class="">
              <div class="text-xl font-bold">Blog</div>
              <div class="text-xs">ブログ閲覧ページ</div>
            </div>
          </router-link>
        </div>
      </div>
      -->
    </div>

    <div class="mt-8">
      <div class="flex flex-wrap justify-center gap-4">
        <div
          class="flex size-40 items-center overflow-hidden border"
          v-for="(image, index) in imagePublicStore.images"
          :key="index"
        >
          <img class="" :src="pathPrefix + image.path" :alt="image.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
