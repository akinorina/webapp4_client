<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useImageStore } from '@/stores/image'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import ModalGeneral from '@/components/general/ModalGeneral.vue'
import ButtonGeneral from '@/components/general/ButtonGeneral.vue'
import InputText from '@/components/general/InputText.vue'

// //@ts-ignore
// const BsModal = defineAsyncComponent(() => import('@/components/BsModal.vue'))

// stores
const router = useRouter()
const imageStore = useImageStore()
const { image } = storeToRefs(imageStore)

// env
const pathPrefix = import.meta.env.VITE_STORAGE_PATH_PREFIX

// modal
const modalUpdateConfirm = ref()
const modalUpdateSuccess = ref()
const modalDeleteConfirm = ref()
const modalDeleteSuccess = ref()

const props = defineProps({
  id: { type: String, required: true }
})
const id = parseInt(props.id) ?? 0

// lifecycle
onMounted(() => {
  imageStore.getImage(id)
})

// functions
const toList = () => {
  router.push({ name: 'admin_images', params: {} })
}
const updateImage = async () => {
  modalUpdateConfirm.value.close()
  // 画像情報 更新
  await imageStore.updateImage(id)
  modalUpdateSuccess.value.open()
  setTimeout(() => {
    modalUpdateSuccess.value.close()
  }, 3000)
}
const deleteImage = async () => {
  modalDeleteConfirm.value.close()
  // 画像情報 削除
  await imageStore.deleteImage(id)
  modalDeleteSuccess.value.open()
  setTimeout(() => {
    modalDeleteSuccess.value.close()
    router.push({ name: 'admin_images', params: {} })
  }, 3000)
}
</script>

<template>
  <div class="containter mx-auto">
    <form class="m-2 border p-2" novalidate @submit.stop.prevent="modalUpdateConfirm.open()">
      <div class="w-full">
        <div class="">
          <div class="">
            <div class="flex w-full justify-center">
              <img :src="pathPrefix + image.path" class="w-72" />
            </div>
            <div class="w-full p-2">
              <label for="imagename" class="block p-2">表示名</label>
              <input-text class="w-full" id="imagename" v-model="image.name" />
            </div>
          </div>
        </div>

        <div class="mt-3">
          <ButtonGeneral type="button" class="me-2" @click="toList">戻る</ButtonGeneral>
          <ButtonGeneral type="submit" class="me-2"> 更新 </ButtonGeneral>
          <ButtonGeneral type="button" class="" @click="modalDeleteConfirm.open()">
            削除
          </ButtonGeneral>
        </div>
      </div>
    </form>
  </div>

  <ModalGeneral ref="modalUpdateConfirm">
    <div class="w-64 p-3">
      <div class="text-center">
        <div class="font-bold">画像情報</div>
        <div class="m-3">更新してよろしいですか？</div>
      </div>
      <div class="text-center">
        <ButtonGeneral class="me-2" @click="updateImage">はい</ButtonGeneral>
        <ButtonGeneral class="" @click="modalUpdateConfirm.close()">いいえ</ButtonGeneral>
      </div>
    </div>
  </ModalGeneral>

  <ModalGeneral ref="modalUpdateSuccess">
    <div class="w-64 p-3">
      <div class="text-center">
        <div class="font-bold">画像情報</div>
        <div class="m-3">更新しました。</div>
      </div>
    </div>
  </ModalGeneral>

  <ModalGeneral ref="modalDeleteConfirm">
    <div class="w-64 p-3">
      <div class="text-center">
        <div class="font-bold">画像情報</div>
        <div class="m-3">削除してよろしいですか？</div>
      </div>
      <div class="text-center">
        <ButtonGeneral class="me-2" @click="deleteImage">はい</ButtonGeneral>
        <ButtonGeneral class="" @click="modalDeleteConfirm.close()">いいえ</ButtonGeneral>
      </div>
    </div>
  </ModalGeneral>

  <ModalGeneral ref="modalDeleteSuccess">
    <div class="w-64 p-3">
      <div class="text-center">
        <div class="font-bold">画像情報</div>
        <div class="m-3">削除しました。</div>
      </div>
    </div>
  </ModalGeneral>
</template>

<style scoped lang="scss">
.main {
  min-height: 100vh;
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);

  .users_title {
    position: relative;
  }
  .image {
    max-width: 100%;
    max-height: 650px;
  }

  .imagename {
    width: 100%;
  }
}
</style>
