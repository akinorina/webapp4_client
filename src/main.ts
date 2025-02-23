import './assets/scss/main.scss'

import { createApp, ref } from 'vue'
import { createPinia } from 'pinia'
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue'

import App from './App.vue'
import router from './router'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
// Error Handler
import type { ComponentPublicInstance } from 'vue'
import Webapp4Error from './lib/Webapp4Error'

const app = createApp(App)
const appInstance = ref<ComponentPublicInstance>()

app.use(createPinia())
app.use(router)
app.use(CkeditorPlugin)
app.component('VueDatePicker', VueDatePicker)

app.config.errorHandler = errorHandler

export async function errorHandler(
  err: Webapp4Error | any,
  instance: ComponentPublicInstance | null,
  info: string
) {
  console.error('<< error handler >>')
  console.error('err.code', err.code)
  console.error('err.type', err.type)
  console.error('err.name', err.name)
  console.error('err.message', err.message)
  console.error('instance', instance)
  console.error('info', info)

  // Modal Dialog 表示
  if (err instanceof Webapp4Error && err.type === 'application') {
    ;(appInstance.value as any).showError(err)
  }
}

appInstance.value = app.mount('#app')
