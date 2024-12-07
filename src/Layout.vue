<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Layout, Nav } from '@kousum/semi-ui-vue'

const { Sider, Content } = Layout
const router = useRouter()
const route = useRoute()

const menuItems = [
  { 
    itemKey: 'chat', 
    text: '心理咨询', 
    icon: 'message',
    link: '/chat'
  },
  { 
    itemKey: 'history', 
    text: '咨询记录', 
    icon: 'history',
    link: '/history'
  }
]

const selectedKeys = ref([route.path.split('/')[1] || 'chat'])

// 监听路由变化，更新选中的菜单项
watch(() => route.path, (newPath) => {
  selectedKeys.value = [newPath.split('/')[1] || 'chat']
})

const handleSelect = ({ itemKey }: { itemKey: string }) => {
  router.push(`/${itemKey}`)
}
</script>

<template>
  <div class="layout-container">
    <!-- 左侧边栏 -->
    <div class="layout-sider">
      <div class="logo">
        <h2 class="logo-text">心理咨询系统</h2>
      </div>
      <Nav
        class="layout-nav"
        :selectedKeys="selectedKeys"
        :items="menuItems"
        @select="handleSelect"
      />
    </div>
    
    <!-- 右侧内容区 -->
    <div class="layout-main">
      <div class="content-wrapper">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

/* 左侧边栏 */
.layout-sider {
  width: 240px;
  height: 100vh;
  background: #001529;
  padding: 20px 0;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

/* 右侧主要内容区 */
.layout-main {
  flex: 1;
  height: 100vh;
  background: #f5f5f5;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 24px;
  position: relative;
  z-index: 1;
}

.content-wrapper {
  height: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logo {
  padding: 16px;
  margin-bottom: 20px;
  text-align: center;
}

.logo-text {
  color: white;
  margin: 0;
  font-size: 18px;
}

.layout-nav {
  border-right: none;
}

/* 美化滚动条 */
.layout-main::-webkit-scrollbar {
  width: 8px;
}

.layout-main::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.layout-main::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.layout-main::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-to {
  opacity: 0;
}
</style> 