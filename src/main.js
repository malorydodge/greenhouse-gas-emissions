import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)
app.use(BootstrapVue)
app.mount('#app')
