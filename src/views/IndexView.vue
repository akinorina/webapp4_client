<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useImagePublicStore } from '@/stores/imagePublic'

const imagePublicStore = useImagePublicStore()

onMounted(() => {
  imagePublicStore.getImages()
})
</script>

<template>
  <div>
    <div class="container my-3">
      <div class="p-5 mb-3 text-center bg-body-tertiary rounded-3">
        <h1 class="text-body-emphasis">Webapp4</h1>
        <p class="col-lg-8 mx-auto fs-5 text-muted">
          Web アプリケーション テンプレート ver.4 です。<br />
          Database, SMTP, ObjectStorage などのミドルウェアとともに動作。<br />
          NestJSのRestAPI サーバー、および、Vue3 による クライアント により実現してます。
        </p>
      </div>
    </div>

    <div class="container text-center">
      <div class="row">
        <div class="col-4">
          <router-link :to="{ name: 'admin' }" class="text-decoration-none">
            <div class="card bg-body-tertiary text-body border rounded p-3">
              <div class="card-body px-2">
                <h5 class="card-title">User Page</h5>
                <p class="card-text">登録ユーザー用のページへ遷移。</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-4">
          <router-link :to="{ name: 'samples' }" class="text-decoration-none">
            <div class="card bg-body-tertiary text-body border rounded p-3">
              <div class="card-body px-2">
                <h5 class="card-title">Samples</h5>
                <p class="card-text">Webapp4 各種機能のサンプルページ。</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row g-0 mt-4">
        <div class="col-4 photo" v-for="(image, index) in imagePublicStore.images" :key="index">
          <img class="img-thumbnail photo__img" :src="image.path" :alt="image.name" />
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
  margin: 0 0 20px 0;

  &__img {
    border: 1px black solid;
    height: calc(100vw / 3.5);
    width: calc(100vw / 3.5);
    object-fit: cover;
  }
}
</style>
