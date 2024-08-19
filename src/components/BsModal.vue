<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  isCloseBtn: { type: Boolean, default: true },
  isCloseModalBack: { type: Boolean, default: true },
  btnClass: { type: String, default: 'btn btn-primary' }
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
    <div
      v-if="status"
      class="modal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      @click.stop="closeModalBack"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" @click.stop>
          <div class="modal-header" v-if="$slots.title || $slots.header">
            <h1 v-if="$slots.title" class="modal-title fs-5" id="exampleModalLabel">
              <slot name="title"></slot>
            </h1>
            <div v-if="$slots.header">
              <slot name="header"></slot>
            </div>
            <button
              v-if="props.isCloseBtn"
              type="button"
              class="btn-close"
              aria-label="Close"
              @click.prevent="close"
            ></button>
          </div>
          <div v-if="$slots.default" class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer" v-if="$slots.footer || $slots.close">
            <div v-if="$slots.footer">
              <slot name="footer"></slot>
            </div>
            <button v-if="$slots.close" type="button" class="btn btn-secondary" @click="close">
              <slot name="close"></slot>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal {
  display: block;
  background-color: #00000088;
}
</style>
