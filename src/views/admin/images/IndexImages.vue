<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useImageStore } from '@/stores/image'
import ButtonGeneral from '@/components/ui/ButtonGeneral.vue'

// stores
const router = useRouter()
const imageStore = useImageStore()

// env
const pathPrefix = import.meta.env.VITE_STORAGE_PATH_PREFIX

// lifecycle
onMounted(async () => {
  await imageStore.getImages()
})

// functions
const toNew = () => {
  router.push({ name: 'admin_images_new', params: {} })
}
const toEdit = (iid: number) => {
  router.push({ name: 'admin_images_edit', params: { id: iid } })
}
</script>

<template>
  <div class="container mx-auto">
    <div class="mx-3 my-2">
      <h2 class="font-bold my-2">画像</h2>
    </div>

    <div class="my-2">
      <button-general class="" @click="toNew">新規作成</button-general>
    </div>

    <div class="">
      <div class="mx-auto">
        <div class="flex flex-row flex-wrap justify-start gap-0">
          <div class="flex-auto" v-for="(item, index) in imageStore.images" :key="index">
            <div
              class="size-48 border border-white flex justify-center items-center overflow-hidden"
            >
              <img
                class="overflow-hidden"
                :src="pathPrefix + item.path"
                :alt="item.name"
                @click="toEdit(item.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// .main {
//   min-height: 100vh;

//   .ope {
//     margin-bottom: 16px;
//   }

//   .body {
//     .images {
//       .frame {
//         height: 220px;

//         .item {
//           width: 210px;
//           height: 210px;

//           display: flex;
//           justify-content: center;
//           align-items: center;

//           .image {
//             max-width: 210px;
//             max-height: 210px;
//           }
//         }
//       }
//     }
//   }
// }
</style>
