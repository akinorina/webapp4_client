<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useImageStore } from '@/stores/image'
import { useRouter } from 'vue-router'
import { defineAsyncComponent, ref } from 'vue'

//@ts-ignore
const BsModal = defineAsyncComponent(() => import('@/components/BsModal.vue'))

// stores
const router = useRouter()
const imageStore = useImageStore()
const { image } = storeToRefs(imageStore)

const props = defineProps({
  id: { type: String, required: true }
})
const id = parseInt(props.id) ?? 0

// modal
const deleteModal = ref()

// lifecycle
onMounted(() => {
  imageStore.getImage(id)
})

// functions
const toList = () => {
  router.push({ name: 'admin_images', params: {} })
}
const toEdit = () => {
  router.push({ name: 'admin_images_edit', params: { id: id } })
}
const deleteIt = async () => {
  await imageStore.deleteImage(id)
  router.push({ name: 'admin_images', params: {} })
}
</script>

<template>
  <div class="container main">
    <div class="main">
      <div class="row">
        <div class="col-6">
          <div class="p-3 my-1 border rounded item text-center align-item-center">
            <img :src="'http://localhost:9000' + image.path" class="image" />
          </div>
        </div>
        <div class="col-6">
          <div class="row g-1 py-2">
            <div class="p-3 my-1 border rounded item">
              {{ image.id }}
            </div>

            <div class="p-3 my-1 border rounded item">
              {{ image.name }}
            </div>
          </div>
        </div>
      </div>

      <div class="p-3 mt-3">
        <button type="button" class="btn btn-secondary me-2" @click="toList">戻る</button>
        <button type="button" class="btn btn-primary me-2" @click="toEdit">編集</button>
        <button type="button" class="btn btn-danger" @click="deleteModal.open()">削除</button>
      </div>
    </div>
  </div>

  <BsModal ref="deleteModal">
    <template #title>削除してよろしいですか？</template>
    <template #footer>
      <button type="button" class="btn btn-danger" @click="deleteIt">削除</button>
    </template>
    <template #close>いいえ</template>
  </BsModal>
</template>

<style scoped lang="scss">
.main {
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
  .image {
    max-width: 100%;
    max-height: 650px;
  }
}
</style>
