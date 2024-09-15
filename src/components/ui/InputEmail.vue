<script setup lang="ts">
const model = defineModel({ required: true })

const props = defineProps({
  id: { type: String, default: '' },
  placefolder: { type: String, default: '' }
})
</script>

<template>
  <input
    type="email"
    :id="props.id"
    :placeholder="props.placefolder"
    class="border rounded-sm mx-1 px-2"
    v-model="model"
  />
</template>

<style lang="scss" scoped></style>
