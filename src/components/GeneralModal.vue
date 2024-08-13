<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  isCloseModalBack: { type: Boolean, default: true }
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
    <div v-if="status" class="modal">
      <div class="modal__background" @click.stop.prevent="closeModalBack">
        <div class="modal__content" @click.stop>
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal {
  display: block;

  .modal__background {
    width: 100vw;
    height: 100vh;
    background-color: #00000088;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal__content {
    overflow: hidden;
  }
}
</style>
