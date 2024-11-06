<script setup lang="ts">
import dayjs from 'dayjs';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBlogStore } from '@/stores/blog';

const router = useRouter()
const blogStore = useBlogStore()

onMounted(async () => {
  const options = { orders: 'blogAt:desc' }
  await blogStore.getBlogs(options)
})
</script>

<template>
  <div class="container mx-auto h-full">
    <h2 class="text-3xl p-3 font-bold">
      Blog
    </h2>

    <div class="h-3/4 overflow-scroll">
      <div class="mt-3 px-1">
        <div class="border rounded-md px-2 py-3 my-1" v-for="(item) in blogStore.blogs" :key="item.id" @click="router.push({ name: 'blog_detail', params: { id: item.id } })">
          <div class="text-xl font-bold">{{ item.subject }}</div>
          <div class="">{{ dayjs(item.blogAt).format('YYYY-MM-DD HH:mm') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
