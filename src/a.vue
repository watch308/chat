<template>
    <button @click="webclick">给后台发送消息</button>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue'
import { userInfoService } from '@/api/user.js'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/stores/token.js'
import { ElMessage } from 'element-plus'
const router = useRouter();
const user = ref({
    id: null,
    name: '',
    major: ''
});
var ws: WebSocket;

const tokenStore = useTokenStore();
onBeforeMount(
    //连接WebSocket服务端，然后初始化监听事件
    async (e: Event) => {
        let result;
        try{
            result = await userInfoService();
            ws = new WebSocket("ws://localhost:8080/websocket/" + result.data.id);
            wsInit();
        }
         catch{
            console.log("erro")
         }
        
    }
)

function wsInit() {

    ws.onopen = () => {
        ws.send("服务已连接");
        console.log(ws.readyState)
    }
    ws.onclose = () => {
        console.log("服务器关闭")
        console.log(ws.readyState)
    }
    ws.onmessage = (message) => {
        console.log("收到服务器消息")
        console.log(message)
        console.log(ws.readyState)
    }
    ws.onerror = (error) => {
        console.log("报错了")
        console.log(error)
        console.log(ws.readyState)
    }

}


</script>