<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBlogStore } from '@/stores/blog'
import { useRouter } from 'vue-router'
import { defineAsyncComponent, ref } from 'vue'
import MyCkeditor from '@/components/MyCkeditor.vue'

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
const editModal = ref()

// lifecycle
onMounted(() => {
  blogStore.getBlog(id)
})

// functions
const toDetail = () => {
  router.push({ name: 'admin_blogs_detail', params: { id: id } })
}
const submitForm = async () => {
  await blogStore.updateBlog(id)
  router.push({ name: 'admin_blogs_detail', params: { id: id } })
}
</script>

<template>
  <div class="container">
    <div class="main">
      <form class="needs-validation" novalidate @submit.stop.prevent="editModal.open()">
        <div class="row g-3">
          <div class="col-12">
            <label for="username" class="form-label">ID</label>
            <div class="py-2 px-3 my-1 border rounded">
              {{ blog.id }}
            </div>
          </div>

          <div class="col-12">
            <label for="username" class="form-label">表題</label>
            <input type="text" class="form-control" id="username" v-model="blog.subject" />
          </div>

          <div class="col-sm-12">
            <label for="familyname" class="form-label">本文</label>
            <div class="p-1">
              <MyCkeditor v-model="blog.body" />
            </div>
          </div>
        </div>
        <div class="mt-3">
          <button type="button" class="btn btn-secondary me-2" @click="toDetail">戻る</button>
          <button type="submit" class="btn btn-primary">更新</button>
        </div>
      </form>
    </div>
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

<style scoped lang="scss"></style>
