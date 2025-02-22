<script setup lang="ts">
const model = defineModel()

export interface Props {
  value?: string
  id?: string
}
const { value = '', id = '' } = defineProps<Props>()

</script>

<template>
  <div class="w-full text-center">
    <div class="flex items-center">
      <input :id="'radio-' + id" type="radio" class="ra me-1" :value="value" v-model="model" />
      <label :for="'radio-' + id"><slot></slot></label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ra {
  width: 1.2rem;
  height: 1.2rem;
}
</style>
