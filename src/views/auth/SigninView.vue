<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { digestMessage } from '@/lib/Functions'

import InputText from '@/components/general/InputText.vue'
import InputPassword from '@/components/general/InputPassword.vue'
import ButtonGeneral from '@/components/general/ButtonGeneral.vue'
import googleIcon from '@/assets/images/google.png'

const authStore = useAuthStore()
const router = useRouter()
const showErrorMessage = ref(false)

const passwordRaw = ref('')
watch(passwordRaw, async (newPasswordRaw) => {
  authStore.password = await digestMessage(newPasswordRaw)
})

onMounted(() => {
  // reset email & password
  authStore.email = ''
  authStore.password = ''
  passwordRaw.value = ''
})

const submitSignin = async () => {
  try {
    await authStore.signIn()
    router.push({ name: 'sign-in-redirect' })
  } catch (err: any) {
    console.error('err', err)
    if (err.response.status === 401) {
      showErrorMessage.value = true
      setTimeout(() => {
        showErrorMessage.value = false
      }, 3000)
    } else {
      throw err
    }
  }
}

const signInGoogle = () => {
  authStore.signInByGoogle()
}
</script>

<template>
  <div class="container mx-auto">
    <div class="m-1 border-8 border-slate-50 p-3">
      <div class="m-0 mx-auto max-w-96">
        <form @submit.prevent="submitSignin">
          <div class="m-3 text-center text-lg font-bold">Sign-in</div>

          <div class="flex justify-center" v-if="showErrorMessage">
            <div class="rounded bg-red-400 p-3 text-sm font-bold text-white" role="alert">
              メールアドレス、または、パスワードに誤りがあります。
            </div>
          </div>

          <div class="mx-auto w-full max-w-96">
            <div class="flex px-1 py-3">
              <label class="w-1/4 p-2 text-sm" for="floatingInput">Email</label>
              <input-text
                id="floatingInput"
                v-model="authStore.email"
                placefolder="name@example.com"
                class="w-3/4 p-2"
              />
            </div>

            <div class="flex px-1 py-3">
              <label class="w-1/4 p-2 text-sm" for="floatingPassword">Password</label>
              <input-password
                id="floatingPassword"
                v-model="passwordRaw"
                placefolder="Password"
                class="w-3/4 p-2"
              />
            </div>

            <div class="">
              <ButtonGeneral
                type="submit"
                class="my-3 flex w-full items-center justify-center py-2"
              >
                sign-in
              </ButtonGeneral>
            </div>
          </div>
        </form>

        <div class="my-0">または</div>

        <div class="my-3 flex w-full items-center justify-center">
          <ButtonGeneral class="flex w-full items-center justify-center py-2" @click="signInGoogle">
            <img :src="googleIcon" class="me-2 w-6" />
            googleアカウントでサインイン
          </ButtonGeneral>
        </div>

        <div class="my-5">&nbsp;</div>

        <div class="my-3 flex w-full items-center justify-center">
          <ButtonGeneral
            class="flex w-full items-center justify-center bg-slate-500 py-2 hover:bg-slate-600"
            @click="router.push({ name: 'reset-password' })"
          >
            <router-link :to="{ name: 'reset-password' }"> パスワードを忘れた場合 </router-link>
          </ButtonGeneral>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
