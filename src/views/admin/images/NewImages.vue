<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useImageStore } from '@/stores/image'
import { useRouter } from 'vue-router'

// stores
const router = useRouter()
const imageStore = useImageStore()
const { image } = storeToRefs(imageStore)

// lifecycle
onMounted(() => {
  imageStore.newImage()
})

// functions
const toList = () => {
  router.push({ name: 'admin_images', params: {} })
}

const chooseImage = (ev: any) => {
  const fi = ev.target.files[0]
  image.value.originalname = fi.name
  image.value.mimetype = fi.mimetype

  const reader = new FileReader()
  reader.onload = (evt) => {
    if (typeof evt.target?.result === 'string') {
      image.value.data = evt.target?.result
    }
  }
  reader.readAsDataURL(fi)
}

const submitForm = async () => {
  await imageStore.createImage()
  router.push({ name: 'admin_images', params: {} })
}
</script>

<template>
  <div class="container">
    <div class="main">
      <form class="needs-validation" novalidate @submit.prevent="submitForm">
        <div class="row">
          <div class="col-12 item">
            <label for="familyname" class="form-label">画像表示名</label>
            <input type="text" class="form-control" id="familyname" v-model="image.name" />
          </div>

          <div class="col-12 item">
            <label for="familyname" class="form-label">画像ファイル</label>
            <input
              type="file"
              class="form-control"
              id="familyname"
              name="image_file"
              @change="chooseImage"
            />
          </div>
        </div>

        <div class="mt-3">
          <button type="button" class="btn btn-secondary me-2" @click="toList">戻る</button>
          <button type="submit" class="btn btn-primary me-2">作成</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);

  .users_title {
    position: relative;
  }

  .main {
    input[type='text'],
    input[type='email'] {
      background-color: var(--bs-secondary-bg);
    }

    .item {
      margin-bottom: 1rem;
    }
  }
}
</style>
