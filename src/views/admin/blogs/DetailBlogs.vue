<script setup lang="ts">
import { onMounted, ref, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'

//@ts-ignore
const BsModal = defineAsyncComponent(() => import('@/components/BsModal.vue'))

// stores
const router = useRouter()
const blogStore = useBlogStore()
const { blog } = storeToRefs(blogStore)

const props = defineProps({
  id: { type: String, required: true }
})
const id = parseInt(props.id) ?? 0

// modal
const deleteModal = ref()

// lifecycle
onMounted(() => {
  blogStore.getBlog(id)
})

// functions
const toList = () => {
  router.push({ name: 'admin_blogs', params: {} })
}
const toEdit = () => {
  router.push({ name: 'admin_blogs_edit', params: { id: id } })
}
const deleteIt = async () => {
  await blogStore.deleteBlog(id)
  router.push({ name: 'admin_blogs', params: {} })
}
</script>

<template>
  <div class="container main">
    <div class="main">
      <div class="row g-1 py-2">
        <div class="p-3 my-1 border rounded item">
          {{ blog.id }}
        </div>

        <div class="p-3 my-1 border rounded item">
          {{ blog.subject }}
        </div>

        <div class="p-1 my-1 border rounded item">
          <textarea
            class="col-12"
            style="border: 0"
            readonly
            v-model="blog.body"
            rows="10"
          ></textarea>
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

<style scoped lang="scss"></style>
