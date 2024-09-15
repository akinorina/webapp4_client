<script setup lang="ts">
import { ref } from 'vue'

const model = defineModel({ required: true })

const props = defineProps({
  id: { type: String, default: '' },
  placefolder: { type: String, default: '' }
})

const type = ref('password')
</script>

<template>
  <input
    :type="type"
    :id="props.id"
    :placeholder="props.placefolder"
    class="border rounded-sm mx-1 px-2"
    v-model="model"
  />
</template>

<style lang="scss" scoped></style>
