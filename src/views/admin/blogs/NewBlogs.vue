<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { AxiosError } from 'axios'
import { useBlogStore } from '@/stores/blog'
import CkeditorBalloon from '@/components/general/CkeditorBalloon.vue'
import ButtonGeneral from '@/components/general/ButtonGeneral.vue'
import InputText from '@/components/general/InputText.vue'
import ModalGeneral from '@/components/general/ModalGeneral.vue'

// stores
const router = useRouter()
const blogStore = useBlogStore()
const { blog } = storeToRefs(blogStore)

const showErrorAlert = ref(false)

// modal
const modalCreateConfirm = ref()
const modalCreateSuccess = ref()

// lifecycle
onMounted(() => {
  blogStore.newBlog()
})

// functions
const toIndex = () => {
  router.push({ name: 'admin_blogs', params: {} })
}
const createBlog = async () => {
  try {
    modalCreateConfirm.value.close()
    // ブログ作成
    await blogStore.createBlog()

    modalCreateSuccess.value.open()
    setTimeout(() => {
      modalCreateSuccess.value.close()
      //
      router.push({ name: 'admin_blogs', params: {} })
    }, 3000)
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
    <div class="mx-3 my-2">
      <h2 class="my-2 font-bold">Blog</h2>
    </div>

    <div v-if="showErrorAlert">
      <div class="" role="alert">入力データに不備があります。</div>
    </div>

    <div class="">
      <form class="" novalidate @submit.prevent="modalCreateConfirm.open()">
        <div class="">
          <div class="flex p-3">
            <label for="username" class="block w-20">表題</label>
            <input-text class="w-80" id="username" v-model="blog.subject" />
          </div>

          <div class="flex p-3">
            <label for="datetime" class="block w-24">ブログ日時</label>
            <div class="w-80">
              <VueDatePicker id="datetime" v-model="blog.blogAt" />
            </div>
          </div>

          <div class="p-3">
            <label for="familyname" class="">本文</label>
            <div class="w-full">
              <CkeditorBalloon v-model="blog.body" :placeholder="'ここに本文を書きます。'" />
            </div>
          </div>
        </div>

        <div class="">
          <ButtonGeneral type="button" class="me-2" @click="toIndex">戻る</ButtonGeneral>
          <ButtonGeneral type="submit" class="">作成</ButtonGeneral>
        </div>
      </form>
    </div>
  </div>

  <ModalGeneral ref="modalCreateConfirm">
    <div class="w-80 p-3">
      <div class="text-center">
        <div class="font-bold">ブログ</div>
        <div class="m-3">作成します。よろしいですか？</div>
      </div>
      <div class="text-center">
        <ButtonGeneral class="me-2" @click.stop="createBlog">はい</ButtonGeneral>
        <ButtonGeneral class="" @click.stop="modalCreateConfirm.close()">いいえ</ButtonGeneral>
      </div>
    </div>
  </ModalGeneral>

  <ModalGeneral ref="modalCreateSuccess">
    <div class="w-80 p-3">
      <div class="text-center">
        <div class="font-bold">ブログ</div>
        <div class="m-3">作成しました。</div>
      </div>
    </div>
  </ModalGeneral>
</template>

<style scoped lang="scss"></style>
