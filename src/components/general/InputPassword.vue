<script setup lang="ts">
import { ref } from 'vue'

const model = defineModel({ required: true })

export interface Props {
  placefolder?: any
}
const { placefolder = '' } = defineProps<Props>()

const type = ref('password')
</script>

<template>
  <input
    :type="type"
    class="mx-1 rounded-sm border px-2"
    :placeholder="placefolder"
    v-model="model"
  />
</template>

<style lang="scss" scoped></style>
