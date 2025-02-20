<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import ButtonGeneral from '@/components/general/ButtonGeneral.vue'
import InputPassword from '@/components/general/InputPassword.vue'
import { digestMessage } from '@/lib/Functions'

// stores
const router = useRouter()
const userStore = useUserStore()

// variables
const resultSuccess = ref(false)
const resultFailure = ref(false)

const passwordOldRaw = ref('')
watch(passwordOldRaw, async (passwordOldRaw) => {
  userStore.oldPassword = await digestMessage(passwordOldRaw)
})

const passwordNewRaw = ref('')
watch(passwordNewRaw, async (passwordNewRaw) => {
  userStore.newPassword = await digestMessage(passwordNewRaw)
})

//
onMounted(() => {
  userStore.oldPassword = ''
  userStore.newPassword = ''
})

// functions
const toAdmin = () => {
  router.push({ name: 'admin', params: {} })
}
const submitForm = async () => {
  try {
    await userStore.changePassword()

    resultSuccess.value = true
    setTimeout(() => {
      resultSuccess.value = false
    }, 3000)
  } catch (err) {
    resultFailure.value = true
    setTimeout(() => {
      resultFailure.value = false
    }, 3000)
  }
}
</script>

<template>
  <div class="container mx-auto p-2">
    <div class="mx-auto max-w-96 border-0 border-red-600">
      <div class="mx-auto w-full p-3 text-center text-lg font-bold">パスワード変更</div>

      <div class="mb-3 bg-green-500 p-3 font-bold text-white" v-if="resultSuccess">
        パスワードが変更されました。
      </div>
      <div class="mb-3 bg-red-500 p-3 font-bold text-white" v-if="resultFailure">
        パスワード変更が失敗しました。
      </div>

      <form class="" novalidate @submit.stop.prevent="submitForm">
        <div class="flex w-full flex-col items-center">
          <div class="m-3 flex w-full">
            <label class="w-2/5 py-2" for="old_password">パスワード</label>
            <input-password class="w-3/5 p-2 text-3xl" id="old_password" v-model="passwordOldRaw" />
          </div>

          <div class="m-3 flex w-full">
            <label class="w-2/5 py-2" for="new_password">新しいパスワード</label>
            <input-password class="w-3/5 p-2 text-3xl" id="new_password" v-model="passwordNewRaw" />
          </div>
        </div>

        <div class="mt-5 text-center">
          <ButtonGeneral type="button" class="me-2 bg-slate-400 hover:bg-slate-500" @click="toAdmin"
            >戻る</ButtonGeneral
          >
          <ButtonGeneral type="submit" class="me-0">更新</ButtonGeneral>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
