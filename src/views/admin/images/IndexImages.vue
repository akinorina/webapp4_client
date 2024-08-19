<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useImageStore } from '@/stores/image'

// stores
const router = useRouter()
const imageStore = useImageStore()

// lifecycle
onMounted(async () => {
  await imageStore.getImages()
})

// functions
const toNew = () => {
  router.push({ name: 'admin_images_new', params: {} })
}
const toDetail = (iid: number) => {
  router.push({ name: 'admin_images_detail', params: { id: iid } })
}
</script>

<template>
  <div class="container main">
    <div class="py-2 ope">
      <button type="button" class="btn btn-outline-primary" @click="toNew">
        <i class="bi bi-image display-6"></i>
      </button>
    </div>

    <div class="body">
      <div class="">
        <div class="row images">
          <div
            class="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 d-flex justify-content-center align-items-center frame"
            v-for="(item, index) in imageStore.images"
            :key="index"
          >
            <div class="item">
              <img
                class="image"
                :src="'http://localhost:9000' + item.path"
                :alt="item.name"
                @click="toDetail(item.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  min-height: 100vh;

  .ope {
    margin-bottom: 16px;
  }

  .body {
    .images {
      .frame {
        height: 220px;

        .item {
          width: 210px;
          height: 210px;

          display: flex;
          justify-content: center;
          align-items: center;

          .image {
            max-width: 210px;
            max-height: 210px;
          }
        }
      }
    }
  }
}
</style>
