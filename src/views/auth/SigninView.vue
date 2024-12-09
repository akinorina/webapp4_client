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
    router.push({ name: 'admin' })
  } catch (err: any) {
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
      <div class="m-0 max-w-96 mx-auto">
        <form @submit.prevent="submitSignin">
          <div class="m-3 text-center font-bold text-lg">
            Sign-in をどうぞ
          </div>

          <div class="flex justify-center" v-if="showErrorMessage">
            <div class="p-3 bg-red-500 text-white font-bold" role="alert">メールアドレス、または、パスワードに誤りがあります。</div>
          </div>

          <div class="w-full max-w-96 mx-auto">

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

            <div class="flex justify-center px-1 py-3">
              <ButtonGeneral type="submit" class="rounded-md border px-3 py-1">
                sign-in
              </ButtonGeneral>
            </div>
          </div>
        </form>

        <div class="my-3 w-full flex justify-center items-center">
          <ButtonGeneral
            class="w-full rounded-lg bg-slate-200 text-black py-3 text-black hover:bg-slate-300"
            @click="router.push({ name: 'reset-password' })"
          >
            <router-link :to="{ name: 'reset-password' }"> パスワードを忘れた場合 </router-link>
          </ButtonGeneral>
        </div>

        <div class="my-3 w-full flex justify-center items-center">
          <ButtonGeneral
            class="w-full rounded-lg bg-slate-200 text-black py-3 flex items-center justify-center"
            @click="signInGoogle"
          >
            <img :src="googleIcon" class="me-2 w-6" />
            googleアカウントでログイン
          </ButtonGeneral>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
