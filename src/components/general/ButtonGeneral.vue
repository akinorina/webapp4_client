<script setup lang="ts">
export interface Props {
  id?: string
  className?: string
  style?: string
  type?: any
}
const { id = '', className = '', style = '', type = 'button' } = defineProps<Props>()
</script>

<template>
  <button
    :id="id"
    :type="type"
    class="rounded-md bg-sky-500 px-3 py-1 text-slate-50 hover:bg-sky-700"
    :class="className"
    :style="style"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped></style>
