<script setup lang="ts">
const props = defineProps({
  type: { types: '"button" | "submit" | "reset" | undefined', default: 'button' },
  class: { type: String, default: '' },
  id: { type: String, default: '' }
})
</script>

<template>
  <button
    :id="props.id"
    :type="props.type"
    class="bg-sky-500 hover:bg-sky-700 text-slate-50 px-3 py-1 rounded-md"
    :class="props.class"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped></style>
