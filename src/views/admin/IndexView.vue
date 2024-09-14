<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="container mx-auto">
    <div class="container my-3">
      <div class="p-5 mb-3 text-center bg-body-tertiary rounded-3">
        <h1 class="text-body-emphasis">Webapp4 User Page</h1>
        <p class="col-lg-8 mx-auto fs-5 text-muted">
          Webapp4 ユーザーのページです。<br />
          各ユーザーのための操作ができます。<br />
        </p>
      </div>
    </div>

    <div class="container text-center">
      <div class="row">
        <div class="col-3" v-if="authStore.username === 'admin'">
          <router-link :to="{ name: 'admin_users' }" class="text-decoration-none">
            <div class="card bg-body-tertiary text-body border rounded p-3">
              <div class="card-body">
                <h5 class="card-title">Users</h5>
                <p class="card-text">ユーザー管理</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-3">
          <router-link :to="{ name: 'admin_images' }" class="text-decoration-none">
            <div class="card bg-body-tertiary text-body border rounded p-3">
              <div class="card-body">
                <h5 class="card-title">Image</h5>
                <p class="card-text">画像</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-3">
          <router-link :to="{ name: 'admin_blogs' }" class="text-decoration-none">
            <div class="card bg-body-tertiary text-body border rounded p-3">
              <div class="card-body">
                <h5 class="card-title">Blog</h5>
                <p class="card-text">ブログ</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-3">
          <router-link :to="{ name: 'admin_change-password' }" class="text-decoration-none">
            <div class="card bg-body-tertiary text-body border rounded p-3">
              <div class="card-body">
                <h5 class="card-title">change Password</h5>
                <p class="card-text">パスワード変更</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
