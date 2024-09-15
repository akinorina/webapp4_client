<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useImagePublicStore } from '@/stores/imagePublic'

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
        Database, SMTP, ObjectStorage などのミドルウェアとともに動作。<br />
        NestJSのRestAPI サーバー、および、Vue3 による クライアント により実現してます。
      </div>
    </div>

    <div class="m-1">
      <div class="grid grid-cols-2 gap-3">
        <div class="border rounded bg-slate-100 p-3">
          <router-link :to="{ name: 'admin' }" class="">
            <div class="">
              <div class="font-bold">User Page</div>
              <div class="text-xs">登録ユーザー用のページへ遷移。</div>
            </div>
          </router-link>
        </div>

        <div class="border rounded bg-slate-100 p-3">
          <router-link :to="{ name: 'samples' }" class="">
            <div class="">
              <div class="font-bold">Samples</div>
              <div class="text-xs">各種機能のサンプルページ。</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="mt-16">
      <div class="flex flex-wrap justify-center gap-8">
        <div
          class="size-40 border overflow-hidden flex items-center"
          v-for="(image, index) in imagePublicStore.images"
          :key="index"
        >
          <img class="" :src="pathPrefix + image.path" :alt="image.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.photo {
  display: flex;
  justify-content: center;
  align-items: center;
  // margin: 0 0 20px 0;
  background-color: #f0f0f0;

  &__img {
    border: 1px black solid;
    height: calc(100vw / 3.5);
    width: calc(100vw / 3.5);
    object-fit: cover;
  }
}
</style>
