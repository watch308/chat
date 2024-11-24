import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/global.css'
import {createPinia}from 'pinia'


const app=createApp(App);
const pinia=createPinia();
app.use(router);
app.use(ElementPlus);
app.use(pinia);
app.mount('#app');
