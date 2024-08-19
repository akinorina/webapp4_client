import './assets/scss/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { errorHandler } from './lib/ErrorHandler'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.errorHandler = errorHandler

app.mount('#app')
