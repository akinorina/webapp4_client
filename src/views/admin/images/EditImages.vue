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

// modal
const editModal = ref()

const props = defineProps({
  id: { type: String, required: true }
})
const id = parseInt(props.id) ?? 0

// lifecycle
onMounted(() => {
  imageStore.getImage(id)
})

// functions
const toDetail = () => {
  router.push({ name: 'admin_images_detail', params: {} })
}
const submitForm = async () => {
  await imageStore.updateImage(id)
  router.push({ name: 'admin_images_detail', params: { id: id } })
}
</script>

<template>
  <div class="container main">
    <form class="needs-validation" novalidate @submit.stop.prevent="editModal.open()">
      <div class="main">
        <div class="row">
          <div class="col-6">
            <div class="p-3 my-1 border rounded item text-center align-item-center">
              <img :src="'http://localhost:9000' + image.path" class="image" />
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-sm-6" style="width: 100%">
                <label for="imagename" class="form-label">表示名</label>
                <input
                  type="text"
                  class="form-control imagename"
                  id="imagename"
                  v-model="image.name"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="p-3 mt-3">
          <button type="button" class="btn btn-secondary me-2" @click="toDetail">戻る</button>
          <button type="submit" class="btn btn-primary">更新</button>
        </div>
      </div>
    </form>
  </div>

  <BsModal ref="editModal">
    <template #button>更新</template>
    <template #title>更新してよろしいですか？</template>
    <template #footer>
      <button type="button" class="btn btn-primary" @click="submitForm">更新</button>
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
