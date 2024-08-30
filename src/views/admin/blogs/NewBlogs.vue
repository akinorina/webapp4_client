<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { AxiosError } from 'axios'
import { useBlogStore } from '@/stores/blog'
import MyCkeditor from '../../../components/MyCkeditor.vue'

// stores
const router = useRouter()
const blogStore = useBlogStore()
const { blog } = storeToRefs(blogStore)

const showErrorAlert = ref(false)

// lifecycle
onMounted(() => {
  blogStore.newBlog()
})

// functions
const toList = () => {
  router.push({ name: 'admin_blogs', params: {} })
}
const submitForm = async () => {
  try {
    await blogStore.createBlog()
    router.push({ name: 'admin_blogs', params: {} })
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
  <div class="container">
    <div v-if="showErrorAlert">
      <div class="alert alert-danger" role="alert">入力データに不備があります。</div>
    </div>

    <div class="main">
      <form class="needs-validation" novalidate @submit.prevent="submitForm">
        <div class="row g-3">
          <div class="col-12">
            <label for="username" class="form-label">表題</label>
            <input type="text" class="form-control" id="username" v-model="blog.subject" />
          </div>

          <div class="col-sm-12">
            <label for="familyname" class="form-label">本文</label>
            <div class="p-1 my-1 border rounded item">
              <textarea class="col-12" style="border: 0" v-model="blog.body" rows="10"></textarea>
            </div>
          </div>

          <div class="col-sm-12">
            <MyCkeditor v-model="blog.body" />
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

<style scoped lang="scss"></style>
