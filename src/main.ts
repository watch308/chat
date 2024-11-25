import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/global.css'
import {createPinia}from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
const persist = createPersistedState()



const app=createApp(App);
const pinia=createPinia();
pinia.use(persist);
app.use(router);
app.use(ElementPlus);
app.use(pinia);
app.mount('#app');
