<script setup lang="ts"></script>

<template>
  <div class="container my-3">
    <div class="p-5 mb-3 text-center bg-body-tertiary rounded-3">
      <h1 class="text-body-emphasis">Webapp4 - Samples</h1>
      <p class="col-lg-8 mx-auto fs-5 text-muted">
        Web アプリケーション テンプレート ver.4 のサンプルページです。<br />
        種々の機能をサンプルとして実現しています。
      </p>
    </div>

    <div class="container text-center">
      <div class="row">
        <div class="col-3">
          <router-link :to="{ name: 'samples_generalmodal' }" class="text-decoration-none">
            <div class="card text-dark bg-primary-subtle border rounded p-3">
              <div class="card-body">
                <h5 class="card-title">General modal</h5>
                <p class="card-text">General モーダルダイアログのサンプルです。</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-3">
          <router-link :to="{ name: 'samples_bsmodal' }" class="text-decoration-none">
            <div class="card text-dark bg-primary-subtle border rounded p-3">
              <div class="card-body">
                <h5 class="card-title">Bootstrap modal</h5>
                <p class="card-text">Bootstrap モーダルダイアログのサンプルです。</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
