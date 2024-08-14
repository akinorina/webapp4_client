<script setup lang="ts">
import W4Header from './components/W4Header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <w4-header />
  </div>
  <RouterView />
</template>

<style scoped></style>
