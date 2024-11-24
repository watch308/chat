import { createRouter, createWebHistory } from 'vue-router'

//导入组件
import LoginVue from '@/Login.vue'
import ChatVue from '@/Chat.vue'



//定义路由关系
const routes = [
    { path: '/login', component: LoginVue },
    {
        path: '/', component: ChatVue
    }
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

//导出路由
export default router
