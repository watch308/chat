<script setup lang="ts">
import { ref } from 'vue'
import { Chat } from '@kousum/semi-ui-vue'

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
  border: '1px solid var(--semi-color-border)',
  borderRadius: '16px',
  margin: '8px 16px',
  height: 550,
}

let id = 0
const getId = () => `id-${id++}`

const uploadProps = { action: 'https://api.semi.design/upload' }
const uploadTipProps = { content: '自定义上传按钮提示信息' }

const message = ref(defaultMessage)
const mode = ref('bubble')
const align = ref('leftRight')

const onMessageSend = (content: string) => {
  const newAssistantMessage = {
    role: 'assistant',
    id: getId(),
    createAt: Date.now(),
    content: "功能开发中",
  }
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
  width: 100%;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}
</style>