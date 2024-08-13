<script setup lang="ts">
import { RouterLink } from 'vue-router'
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
        <div class="col-3">
          <router-link :to="{ name: 'samples' }" class="text-decoration-none">
            <div class="card text-dark bg-primary-subtle border rounded p-3">
              <div class="card-body">
                <h5 class="card-title">Samples</h5>
                <p class="card-text">Webapp4 の各種機能のサンプルページです。</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
