<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { AxiosError } from 'axios'

// stores
const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const passwordRaw = ref('')
watch(passwordRaw, async (newPasswordRaw) => {
  user.value.password = newPasswordRaw
})

const showErrorAlert = ref(false)

// lifecycle
onMounted(() => {
  userStore.newUser()
})

// functions
const toList = () => {
  router.push({ name: 'admin_users', params: {} })
}
const submitForm = async () => {
  try {
    await userStore.createUser()
    router.push({ name: 'admin_users', params: {} })
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
    <div v-if="showErrorAlert">
      <div class="alert alert-danger" role="alert">入力データに不備があります。</div>
    </div>

    <div class="main">
      <form class="needs-validation" novalidate @submit.prevent="submitForm">
        <div class="row g-3">
          <div class="col-12">
            <label for="username" class="form-label">ユーザー名</label>
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
            <input type="email" class="form-control" id="email" v-model="user.email" />
          </div>

          <div class="col-12">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="passwordRaw" />
          </div>
        </div>

        <div class="mt-3">
          <button type="button" class="btn btn-secondary me-2" @click="toList">戻る</button>
          <button type="submit" class="btn btn-primary me-2">作成</button>
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
