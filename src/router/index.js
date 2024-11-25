import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/Login.vue'
import Layout from '@/Layout.vue'
import Chat from '@/Chat.vue'
import History from '@/views/History.vue'
import Profile from '@/views/Profile.vue'
import Settings from '@/views/Settings.vue'

import a from '@/a.vue'
//导入组件





//定义路由关系
const routes = [
    { path: '/login', component: Login },
    { path: '/a', component: a },
    {
        path: '/',
        component: Layout,
        redirect: '/chat',
        children: [
          {
            path: 'chat',
            component: Chat
          },
          {
            path: 'history',
            component: History
          },
          {
            path: 'profile',
            component: Profile
          },
          {
            path: 'settings',
            component: Settings
          }
        ]
      }
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

//导出路由
export default router
