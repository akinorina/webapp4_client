<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { AxiosError } from 'axios'
import { digestMessage } from '@/lib/Functions'
import InputEmail from '@/components/general/InputEmail.vue'
import ButtonGeneral from '@/components/general/ButtonGeneral.vue'
import googleIcon from '@/assets/images/google.png'

// stores
const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const passwordRaw = ref('')
watch(passwordRaw, async (newPasswordRaw) => {
  user.value.password = await digestMessage(newPasswordRaw)
})

const showErrorAlert = ref(false)

// lifecycle
onMounted(() => {
  userStore.newUser()
})

// functions
const toIndex = () => {
  router.push({ name: 'index', params: {} })
}
const submitForm = async () => {
  try {
    await userStore.verifyingEmail('/signup-register-info')
    router.push({ name: 'sign-up-sent-email' })
  } catch (err) {
    if (err instanceof AxiosError) {
      showErrorAlert.value = true
      setTimeout(() => {
        showErrorAlert.value = false
      }, 3000)
    }
  }
}

const signInGoogle = () => {
  authStore.signInByGoogle()
}
</script>

<template>
  <div class="container mx-auto">
    <div class="max-w-96 mx-auto px-3">
      <div class="">
        <div class="m-3 text-center font-bold text-lg">
          Sign-up
        </div>
        <div class="text-sm">
          webapp4 ユーザー登録ページです。<br />
          メールアドレス入力後［送信］を押してください。
        </div>
      </div>

      <div v-if="showErrorAlert">
        <div class="my-3 border p-3" role="alert">
          <p class="">入力データに不備があります。</p>
          <p>メールアドレスが既に登録済みの場合があります。</p>
        </div>
      </div>

      <div class="border p-3">
        <form class="w-full flex justify-center items-center m-3" novalidate @submit.prevent="submitForm">
          <label for="email" class="">email</label>
          <input-email
            id="email"
            class="min-w-40 py-1"
            placefolder="name@example.com"
            v-model="userStore.unverifiedEmail"
          />

          <div class="">
            <ButtonGeneral type="submit" class="">
              送信
            </ButtonGeneral>
          </div>
        </form>

        <div class="w-full py-3 flex justify-center items-center">または</div>

        <ButtonGeneral
          class="w-full py-2 flex justify-center items-center"
          @click="signInGoogle"
        >
          <img :src="googleIcon" class="me-2 w-6" />
          googleアカウントでログイン
        </ButtonGeneral>
      </div>

      <div class="p-3 text-sm">
        アカウントにログインすると
        <a class="text-blue-700 underline" href="#" target="_blank">利用規約</a>
        と
        <a class="text-blue-700 underline" href="#" target="_blank">プライバシーポリシー</a>
        に同意したものとみなされます。
      </div>

      <ButtonGeneral type="button" class="m-2 rounded-md bg-slate-400 border px-2 py-1" @click="toIndex">
        Topへ戻る
      </ButtonGeneral>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
