<script setup lang="ts">
// import { onMounted, ref, watch } from 'vue'
// import { storeToRefs } from 'pinia'
// import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
// import { AxiosError } from 'axios'
// import { digestMessage } from '@/lib/Functions'

// stores
const router = useRouter()
// const userStore = useUserStore()
// const { user } = storeToRefs(userStore)

// const passwordRaw = ref('')
// watch(passwordRaw, async (newPasswordRaw) => {
//   user.value.password = await digestMessage(newPasswordRaw)
// })

// const showErrorAlert = ref(false)

// // lifecycle
// onMounted(() => {
//   userStore.newUser()
// })

// functions
const toSignin = () => {
  router.push({ name: 'sign-in', params: {} })
}
// const submitForm = async () => {
//   try {
//     await userStore.createUser()
//     router.push({ name: 'admin' })
//   } catch (err) {
//     if (err instanceof AxiosError) {
//       showErrorAlert.value = true
//       setTimeout(() => {
//         showErrorAlert.value = false
//       }, 3000)
//     }
//   }
// }
</script>

<template>
  <div class="container">
    <div class="my-3">
      <div class="p-5 mb-3 text-center bg-body-tertiary rounded-3">
        <h1 class="text-body-emphasis">Webapp4 ユーザー登録</h1>
        <p class="col-lg-8 mx-auto fs-5 text-muted">ユーザー登録ページです。</p>
      </div>
    </div>

    <div class="text-center">
      <p class="col-lg-8 mx-auto fs-5 text-muted">ユーザー登録が完了しました。</p>
    </div>

    <div class="text-center">
      <button class="btn btn-primary" @click="toSignin">Sign-in</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
// .container {
//   min-height: 100vh;
//   color: var(--bs-body-color);
//   background-color: var(--bs-body-bg);

//   .users_title {
//     position: relative;

//     &_text {
//       position: absolute;
//       left: 20px;
//       bottom: 0;
//       font-weight: bold;
//     }
//   }

//   .main {
//     input[type='text'],
//     input[type='email'] {
//       background-color: var(--bs-secondary-bg);
//     }
//   }
// }
</style>
