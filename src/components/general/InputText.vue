<script setup lang="ts">
const model = defineModel({ required: true })

export interface Props {
  placefolder?: any
}
const { placefolder = '' } = defineProps<Props>()
</script>

<template>
  <input
    type="text"
    class="mx-1 rounded-sm border px-2"
    :placeholder="placefolder"
    v-model="model"
  />
</template>

<style lang="scss" scoped></style>
