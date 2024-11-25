<script setup lang="ts">
import { ref, onMounted,onBeforeMount } from 'vue'
import { Chat } from '@kousum/semi-ui-vue'
import SockJS from 'sockjs-client'  
import Stomp from 'stompjs'  

const defaultMessage = [
  {
    role: 'system',
    id: '1',
    createAt: 1715676751919,
    content: "你好，欢迎过来进行心理咨询.",
  },
]

const roleInfo = {
  user: {
    name: 'User',
    avatar: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png'
  },
  assistant: {
    name: 'Assistant',
    avatar: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/other/logo.png'
  },
  system: {
    name: 'System',
    avatar: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/other/logo.png'
  }
}

const commonOuterStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  border: '1px solid var(--semi-color-border)',
  borderRadius: '8px',
}

let id = 0
const getId = () => `id-${id++}`

const uploadProps = { action: 'https://api.semi.design/upload' }
const uploadTipProps = { content: '自定义上传钮提示信息' }

const message = ref(defaultMessage)
const mode = ref('bubble')
const align = ref('leftRight')




const user = ref({
    id: null,
    name: '',
    major: ''
});
var ws: WebSocket;
import{userInfoService}from '@/api/user.js'
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
    ws.onmessage = (output) => {
        const ms = { from: 'user', text:output,to:'ai', createAt: Date.now()};
        return message;
    }
    ws.onerror = (error) => {
        console.log("报错了")
        console.log(error)
        console.log(ws.readyState)
    }

}

const onMessageSend = async (content: string) => {
  ws.send(content); // 先发送内容

  // 使用 Promise 来等待消息
  const ms = await new Promise<string>((resolve) => {
    ws.addEventListener("message", function (event) {
      console.log("Message from server ", event.data);
      resolve(event.data); // 解析 Promise
    });
  });

  const newAssistantMessage = {
    role: 'assistant',
    id: getId(),
    createAt: Date.now(),
    content: ms// 使用获取到的消息
  };

  setTimeout(() => {
    message.value = [...message.value, newAssistantMessage]
  }, 200)
}

const onChatsChange = (chats: any[]) => {
  message.value = chats
}

const onMessageReset = () => {
  setTimeout(() => {
    const lastMessage = message.value[message.value.length - 1]
    const newLastMessage = {
      ...lastMessage,
      status: 'complete',
      content: 'This is a mock reset message.',
    }
    message.value = [...message.value.slice(0, -1), newLastMessage]
  }, 200)
}

</script>

<template>
  <div class="chat-container">
    <Chat
      :key="align + mode"
      :align="align"
      :mode="mode"
      :uploadProps="uploadProps"
      :style="commonOuterStyle"
      :chats="message"
      :roleConfig="roleInfo"
      @chatsChange="onChatsChange"
      @messageSend="onMessageSend"
      @messageReset="onMessageReset"
      :uploadTipProps="uploadTipProps"
    />
  </div>
</template>

<style scoped>
.chat-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-height: 0;
}

:deep(.semi-chat) {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

:deep(.semi-chat-list) {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}
</style>