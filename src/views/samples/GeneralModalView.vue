<script setup lang="ts">
import { ref } from 'vue'
import GeneralModal from '@/components/GeneralModal.vue'
import ButtonGeneral from '@/components/ui/ButtonGeneral.vue'

const gmodal = ref()
const gmodal2 = ref()
</script>

<template>
  <div class="container mx-auto">
    <div class="p-3 border">
      <h2 class="font-bold">Webapp4 - Samples</h2>
      <div class="">sample of general modal</div>
    </div>

    <!-- モーダル 1 -->
    <div class="p-3 border m-3">
      <button-general type="button" class="" @click="gmodal.open()">open modal 1</button-general>

      <general-modal ref="gmodal" :is-close-modal-back="true">
        <div class="">
          <div class="w-96 h-54 p-3">
            ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。
            ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。
          </div>
          <div class="text-center mb-3">
            <button-general class="" @click="gmodal.close()">close</button-general>
          </div>
        </div>
      </general-modal>
    </div>

    <!-- モーダル 2 -->
    <div class="p-3 border m-3">
      <button-general type="button" class="" @click="gmodal2.open()">open modal 2</button-general>

      <general-modal
        ref="gmodal2"
        :is-close-modal-back="false"
        :class-bg="''"
        :class-fg="'bg-green-300'"
        :style-bg="'background-color: rgba(255, 255, 200, 0.75)'"
        :style-fg="''"
      >
        <div class="">
          <div class="w-96 h-54 p-3">
            ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。
            ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。ここに本文を書きます。
          </div>
          <div class="text-center mb-3">
            <button-general class="" @click="gmodal2.close()">close</button-general>
          </div>
        </div>
      </general-modal>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
