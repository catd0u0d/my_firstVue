import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index.js'
import { createPinia } from 'pinia'
import piniaPersist from "pinia-plugin-persistedstate"

const app = createApp(App)
const pinia = createPinia()

app.use(router)
pinia.use(piniaPersist)
app.use(pinia)

app.mount('#app')