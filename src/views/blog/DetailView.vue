<script setup lang="ts">
import dayjs from 'dayjs'
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import { storeToRefs } from 'pinia'
import CkeditorBalloon from '@/components/general/CkeditorBalloon.vue'
import ButtonGeneral from '@/components/general/ButtonGeneral.vue'

// router
const router = useRouter()

// blogStore
const blogStore = useBlogStore()
const { blog } = storeToRefs(blogStore)

// blog ID.
let props = defineProps({
  id: { type: String, required: true }
})

watch(
  () => props.id,
  async () => {
    await blogStore.getBlog(parseInt(props.id) ?? 0)
  }
)

onMounted(async () => {
  // get the blog targeted
  await blogStore.getBlog(parseInt(props.id) ?? 0)
})
</script>

<template>
  <div class="container mx-auto h-full">
    <div class="mx-3 flex justify-between py-2">
      <h2 class="text-3xl font-bold" @click="router.push({ name: 'blog' })">Blog</h2>
      <div class="flex justify-between">
        <ButtonGeneral
          class="me-2 border px-4 py-1 text-3xl"
          :disabled="blog.prevId < 0"
          @click="router.push({ name: 'blog_detail', params: { id: blog.prevId } })"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </ButtonGeneral>
        <ButtonGeneral class="me-2 border px-4 py-1" @click="router.push({ name: 'blog' })">
          LIST
        </ButtonGeneral>
        <ButtonGeneral
          class="me-0 border px-4 py-1 text-3xl"
          :disabled="blog.nextId < 0"
          @click="router.push({ name: 'blog_detail', params: { id: blog.nextId } })"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </ButtonGeneral>
      </div>
    </div>

    <div class="mx-3 py-2">
      <div class="text-lg font-bold">{{ blog.subject }}</div>
      <div class="text-md">{{ dayjs(blog.blogAt).format('YYYY-MM-DD HH:mm') }}</div>
    </div>

    <div class="mx-3 h-4/6 rounded-lg border py-2">
      <div class="h-full w-full overflow-scroll">
        <CkeditorBalloon v-model="blog.body" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
