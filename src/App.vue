<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router'
import W4Header from './components/W4Header.vue'
import ModalGeneral from './components/general/ModalGeneral.vue';
import type Webapp4Error from './lib/Webapp4Error';
import type { Webapp4ErrorTypeType } from './lib/Webapp4Error';

const gmodal = ref()
const errorType = ref<Webapp4ErrorTypeType>('')
const message = ref('')

onMounted(() => {
})

const showError = (err: Webapp4Error) => {
  message.value = err.message
  errorType.value = err.type
  gmodal.value.open()
}

defineExpose({
  showError
})
</script>

<template>
  <w4-header />
  <router-view />

  <ModalGeneral ref="gmodal"
    :is-close-modal-back="true"
    :class-bg="'bg-slate-200'"
    :class-fg="'bg-white text-black'"
    :style-bg="''"
    :style-fg="''"
  >
    <div>
      <div class="h-54 w-96 p-3 text-bold text-center">
        {{ errorType }} エラー
      </div>
      <div class="h-54 w-96 p-3">
        {{ message }}
      </div>
      <div class="mb-3 text-center">
        <ButtonGeneral class="" @click="gmodal.close()">閉じる</ButtonGeneral>
      </div>
    </div>
  </ModalGeneral>
</template>

<style scoped></style>
