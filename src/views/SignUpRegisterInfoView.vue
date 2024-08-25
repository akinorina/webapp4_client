<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import { AxiosError } from 'axios'
import { digestMessage } from '@/lib/Functions'

// stores
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const passwordRaw = ref('')
watch(passwordRaw, async (newPasswordRaw) => {
  user.value.password = await digestMessage(newPasswordRaw)
})

const showErrorAlert = ref(false)

// lifecycle
onMounted(() => {
  // QueryString取得
  const queryData: any = route.query
  // 新樹ユーザーデータ作成
  userStore.newUser()
  user.value.email = queryData.email
  user.value.email_hash = queryData.hash
})

// functions
const toIndex = () => {
  router.push({ name: 'index', params: {} })
}
const submitForm = async () => {
  try {
    await userStore.registerUser()
    router.push({ name: 'sign-up-complete' })
  } catch (err) {
    if (err instanceof AxiosError) {
      showErrorAlert.value = true
      setTimeout(() => {
        showErrorAlert.value = false
      }, 3000)
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="my-3">
      <div class="p-5 mb-3 text-center bg-body-tertiary rounded-3">
        <h1 class="text-body-emphasis">Webapp4 ユーザー登録</h1>
        <p class="col-lg-8 mx-auto fs-5 text-muted">
          ユーザー登録ページです。<br />
          次の各項目を入力して登録ボタンを押してください。
        </p>
      </div>
    </div>

    <div v-if="showErrorAlert">
      <div class="alert alert-danger" style="line-height: 1rem" role="alert">
        <p class="fw-bold">入力データに不備があります。</p>
        <p>メールアドレスが既に登録済みの場合があります。</p>
      </div>
    </div>

    <div class="main">
      <form class="needs-validation" novalidate @submit.prevent="submitForm">
        <div class="row g-3">
          <div class="col-12">
            <label for="username" class="form-label"
              >ユーザー表示名 （任意の文字列を指定してください）</label
            >
            <input type="text" class="form-control" id="username" v-model="user.username" />
          </div>

          <div class="col-sm-6">
            <label for="familyname" class="form-label">姓</label>
            <input type="text" class="form-control" id="familyname" v-model="user.familyname" />
          </div>

          <div class="col-sm-6">
            <label for="firstname" class="form-label">名</label>
            <input type="text" class="form-control" id="firstname" v-model="user.firstname" />
          </div>

          <div class="col-sm-6">
            <label for="familynameKana" class="form-label">姓 ふりかな</label>
            <input
              type="text"
              class="form-control"
              id="familynameKana"
              v-model="user.familynameKana"
            />
          </div>

          <div class="col-sm-6">
            <label for="firstnameKana" class="form-label">名 ふりがな</label>
            <input
              type="text"
              class="form-control"
              id="firstnameKana"
              v-model="user.firstnameKana"
            />
          </div>

          <div class="col-12">
            <label for="email" class="form-label">Email</label>
            <input type="email" readonly class="form-control" id="email" v-model="user.email" />
          </div>

          <div class="col-12">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="passwordRaw" />
          </div>
        </div>

        <div class="mt-3">
          <button type="submit" class="btn btn-primary me-2">登録</button>
          <button type="button" class="btn btn-secondary me-2" @click="toIndex">Topへ戻る</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);

  .users_title {
    position: relative;

    &_text {
      position: absolute;
      left: 20px;
      bottom: 0;
      font-weight: bold;
    }
  }

  .main {
    input[type='text'],
    input[type='email'] {
      background-color: var(--bs-secondary-bg);
    }
  }
}
</style>
