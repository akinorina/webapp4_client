<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import { AxiosError } from 'axios'
import { digestMessage } from '@/lib/Functions'
import InputText from '@/components/general/InputText.vue'
import InputEmail from '@/components/general/InputEmail.vue'
import InputPassword from '@/components/general/InputPassword.vue'
import ButtonGeneral from '@/components/general/ButtonGeneral.vue'
import kiyaku from '../../assets/text/kiyaku.txt?raw'

// stores
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const passwordRaw = ref('')
watch(passwordRaw, async (newPasswordRaw) => {
  user.value.password = await digestMessage(newPasswordRaw)
})

const showErrorUrlInvalid = ref(false)
const showErrorAlert = ref(false)

// lifecycle
onMounted(async () => {
  // QueryString取得
  const queryData: any = route.query

  // email と email_hash が未登録である確認
  try {
    await userStore.checkVerifyingEmail(queryData.email, queryData.hash)
  } catch (error) {
    // VerifyingEmail無効（期限切れ、既に登録済み、ほか）
    showErrorUrlInvalid.value = true
    return false
  }

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
    router.push({ name: 'sign-up-completion' })
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
  <div class="container mx-auto">
    <div class="mt-3 border p-2" v-if="showErrorUrlInvalid">
      このメールアドレスへの登録は有効期限切れ、または、既に登録されたため無効です。<br />
      必要なら改めて最初から登録手続きを行なってください。
    </div>
    <div class="mt-3 border p-2" v-else>
      <div class="flex justify-center">
        <div>
          <div class="text-xl font-bold">Webapp4 ユーザー登録</div>
          <div class="text-md mt-2">次の各項目を入力して、登録ボタンを押してください。</div>
        </div>
      </div>

      <div class="mt-3 flex justify-center" v-if="showErrorAlert">
        <div class="" style="line-height: 1rem" role="alert">
          <p class="">入力データに不備があります。</p>
          <p>メールアドレスが既に登録済みの場合があります。</p>
        </div>
      </div>

      <div class="mt-3 flex justify-center">
        <form class="" novalidate @submit.prevent="submitForm">
          <div class="flex flex-col">
            <div class="flex p-3">
              <label for="username" class="block w-32"> ユーザー表示名 </label>
              <input-text class="w-64" id="username" v-model="user.username" />
            </div>

            <div class="flex p-3">
              <label for="familyname" class="block w-32">姓</label>
              <input-text class="w-64" id="familyname" v-model="user.familyname" />
            </div>

            <div class="flex p-3">
              <label for="firstname" class="block w-32">名</label>
              <input-text class="w-64" id="firstname" v-model="user.firstname" />
            </div>

            <div class="flex p-3">
              <label for="familynameKana" class="block w-32">姓 ふりかな</label>
              <input-text class="w-64" id="familynameKana" v-model="user.familynameKana" />
            </div>

            <div class="flex p-3">
              <label for="firstnameKana" class="block w-32">名 ふりがな</label>
              <input-text class="w-64" id="firstnameKana" v-model="user.firstnameKana" />
            </div>

            <div class="flex p-3">
              <label for="email" class="block w-32">Email</label>
              <input-email
                id="email"
                class="w-64"
                placefolder="name@example.com"
                v-model="user.email"
                readonly
              />
            </div>

            <div class="flex p-3">
              <label for="password" class="block w-32">Password</label>
              <input-password
                id="password"
                class="w-64"
                placefolder="Password"
                v-model="passwordRaw"
              />
            </div>

            <div class="p-3 text-sm">
              アカウントにログインすると
              <a class="text-blue-700 underline" href="#" target="_blank">利用規約</a>
              と
              <a class="text-blue-700 underline" href="#" target="_blank">プライバシーポリシー</a>
              に同意したものとみなされます。
            </div>

            <div class="flex justify-start p-3">
              <div class="">
                <input
                  type="checkbox"
                  id="kiyaku"
                  class="m-2 h-5 w-5"
                  :true-value="'1'"
                  :false-value="'0'"
                  v-model="user.agreeTerms"
                />
                <label for="kiyaku">利用規約をすべて読み、同意します。</label>
              </div>
            </div>
            <div class="ms-50 w-full p-3">
              <div class="w-full">
                <textarea
                  class="h-40 w-full border p-2 text-xs"
                  readonly
                  v-model="kiyaku"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="flex justify-center p-3">
            <ButtonGeneral
              type="submit"
              :disabled="user.agreeTerms === '0'"
              class="me-2"
              :class="{ 'bg-slate-300 hover:bg-slate-300': user.agreeTerms === '0' }"
            >
              登録
            </ButtonGeneral>
            <ButtonGeneral type="button" class="me-0" @click="toIndex">Topへ戻る</ButtonGeneral>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
