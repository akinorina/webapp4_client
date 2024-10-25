<script setup lang="ts">
import { ref } from 'vue'

const model = defineModel({ required: true })

export interface Props {
  id?: string
  className?: string
  style?: string
  placefolder?: any
}
const { id = '', className = '', style = '', placefolder = '' } = defineProps<Props>()

const type = ref('password')
</script>

<template>
  <input
    :type="type"
    :id="id"
    class="mx-1 rounded-sm border px-2"
    :class="className"
    :style="style"
    :placeholder="placefolder"
    v-model="model"
  />
</template>

<style lang="scss" scoped></style>
