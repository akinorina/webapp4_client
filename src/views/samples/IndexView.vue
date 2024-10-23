<script setup lang="ts"></script>

<template>
  <div class="container mx-auto">
    <div class="border p-3">
      <h2 class="font-bold">Webapp4 - Samples</h2>
      <p class="text-xs">
        Web アプリケーション テンプレート ver.4 のサンプルページです。<br />
        種々の機能をサンプルとして実現しています。
      </p>
    </div>

    <div class="mt-3 border p-3">
      <router-link :to="{ name: 'samples_generalmodal' }" class="">
        <div class="">
          <div class="">
            <h5 class="">General modal</h5>
            <p class="">General モーダルダイアログのサンプルです。</p>
          </div>
        </div>
      </router-link>
    </div>

    <div class="mt-3 border p-3">
      <router-link :to="{ name: 'samples_ckeditor_classic' }" class="">
        <div class="">
          <div class="">
            <h5 class="">CKEditor - classic</h5>
            <p class="">WYSWIGエディター CLASSIC</p>
          </div>
        </div>
      </router-link>
    </div>

    <div class="mt-3 border p-3">
      <router-link :to="{ name: 'samples_ckeditor_inline' }" class="">
        <div class="">
          <div class="">
            <h5 class="">CKEditor - inline</h5>
            <p class="">WYSWIGエディター INLINE</p>
          </div>
        </div>
      </router-link>
    </div>

    <div class="mt-3 border p-3">
      <router-link :to="{ name: 'samples_ckeditor_balloon' }" class="">
        <div class="">
          <div class="">
            <h5 class="">CKEditor - balloon</h5>
            <p class="">WYSWIGエディター Balloon</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
