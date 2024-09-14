<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  isCloseModalBack: { type: Boolean, default: true },
  classBg: { type: String, default: 'bg-gray-300' },
  classFg: { type: String, default: 'bg-gray-50' },
  styleBg: { type: String, default: '' },
  styleFg: { type: String, default: '' }
})

const status = ref(false)

const open = () => {
  status.value = true
}
const close = () => {
  status.value = false
}
const closeModalBack = () => {
  if (props.isCloseModalBack) {
    status.value = false
  }
}

defineExpose({
  open,
  close
})
</script>

<template>
  <Teleport to="body">
    <div v-if="status" class="absolute left-0 top-0">
      <div
        class="w-screen h-screen flex justify-center items-center"
        :class="props.classBg"
        :style="props.styleBg"
        @click.stop.prevent="closeModalBack"
      >
        <div :class="props.classFg" :style="props.styleFg" @click.stop>
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss"></style>
