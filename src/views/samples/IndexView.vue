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

    <div class="mt-3 border p-3">
      <router-link :to="{ name: 'samples_media' }" class="">
        <div class="">
          <div class="m-3 rounded-lg border p-3 hover:bg-slate-200">
            <h5 class="">media</h5>
            <p class="">Media (video, audio) のサンプルです。</p>
          </div>
        </div>
      </router-link>

      <router-link :to="{ name: 'samples_media-normal' }" class="">
        <div class="">
          <div class="m-3 rounded-lg border p-3 hover:bg-slate-200">
            <h5 class="">media (normal)</h5>
            <p class="">Mediaのサンプル (normal) です。</p>
          </div>
        </div>
      </router-link>

      <router-link :to="{ name: 'samples_media-alttext' }" class="">
        <div class="">
          <div class="m-3 rounded-lg border p-3 hover:bg-slate-200">
            <h5 class="">media (alt text)</h5>
            <p class="">Mediaのサンプル (テキスト代替) です。</p>
          </div>
        </div>
      </router-link>

      <router-link :to="{ name: 'samples_media-blur' }" class="">
        <div class="">
          <div class="m-3 rounded-lg border p-3 hover:bg-slate-200">
            <h5 class="">media (ぼかし)</h5>
            <p class="">Mediaのサンプル (バーチャル背景：ぼかし) です。</p>
          </div>
        </div>
      </router-link>

      <router-link :to="{ name: 'samples_media-vbg' }" class="">
        <div class="">
          <div class="m-3 rounded-lg border p-3 hover:bg-slate-200">
            <h5 class="">media (画像)</h5>
            <p class="">Mediaのサンプル (バーチャル背景：画像) です。</p>
          </div>
        </div>
      </router-link>
    </div>

</div>
</template>

<style scoped lang="scss"></style>
