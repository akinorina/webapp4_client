<script setup lang="ts">
const model = defineModel({ required: true })

export interface Props {
  id?: string
  className?: string
  style?: string
  placefolder?: any
}
const { id = '', className = '', style = '', placefolder = '' } = defineProps<Props>()
</script>

<template>
  <input
    type="email"
    :id="id"
    class="mx-1 rounded-sm border px-2"
    :class="className"
    :style="style"
    :placeholder="placefolder"
    v-model="model"
  />
</template>

<style lang="scss" scoped></style>
