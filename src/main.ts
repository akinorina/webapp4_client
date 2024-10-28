import './assets/scss/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue'

import App from './App.vue'
import router from './router'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { errorHandler } from './lib/ErrorHandler'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(CkeditorPlugin)
app.component('VueDatePicker', VueDatePicker)

app.config.errorHandler = errorHandler

app.mount('#app')
