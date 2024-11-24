<script setup lang="ts">
import DefaultChat from './Chat.vue'
import Login from './Login.vue'
import router from '@/router';


</script>

<template>
  <div class="app-wrapper">
    <router-view></router-view>
  </div>
</template>

<style>
.app-wrapper {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
