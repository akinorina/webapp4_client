<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'

// stores
const router = useRouter()
const blogStore = useBlogStore()

// lifecycle
onMounted(async () => {
  await blogStore.getBlogs()
})

// functions
const toNew = () => {
  router.push({ name: 'admin_blogs_new', params: {} })
}
const toDetail = (iid: number) => {
  router.push({ name: 'admin_blogs_detail', params: { id: iid } })
}
</script>

<template>
  <div class="container">
    <div class="mx-2 my-3">
      <button type="button" class="btn btn-outline-primary" @click="toNew">
        <i class="bi bi-file-earmark-plus display-6"></i>
      </button>
    </div>

    <div class="row g-0 m-2 frame">
      <div
        class="col-12 px-2 py-2 m-2 bg-secondary text-light"
        v-for="(item, index) in blogStore.blogs"
        :key="index"
      >
        <div @click="toDetail(item.id)">
          <div>{{ item.subject }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
