<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const activeTab = ref("login")

const loginData = reactive({
  studentId: '',
  password: ''
})

const signupData = reactive({
  studentId: '',
  name: '',
  password: '',
  major: ''
})

const handleLogin = async (e: Event) => {
  e.preventDefault()
  try {
    const response = await fetch('http://localhost:8080/doLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    })
    if (response.ok) {
      console.log('Login successful')
    } else {
      console.error('Login failed')
    }
  } catch (error) {
    console.error('Login error:', error)
  }
}

const handleSignup = async (e: Event) => {
  e.preventDefault()
  try {
    const response = await fetch('http://localhost:8080/doLogin/doSignUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData)
    })
    if (response.ok) {
      console.log('Signup successful')
    } else {
      console.error('Signup failed')
    }
  } catch (error) {
    console.error('Signup error:', error)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-blue-50">
    <Card class="w-[400px]">
      <CardHeader>
        <CardTitle class="text-center text-2xl font-bold text-blue-700">校园心理监测预警系统</CardTitle>
        <CardDescription class="text-center">
          智能问答平台
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs v-model="activeTab">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="login">登录</TabsTrigger>
            <TabsTrigger value="signup">注册</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form class="space-y-4" @submit="handleLogin">
              <div>
                <label for="login-email" class="block text-sm font-medium text-gray-700">学号</label>
                <Input 
                  id="login-email" 
                  type="text" 
                  required 
                  v-model="loginData.studentId"
                />
              </div>
              <div>
                <label for="login-password" class="block text-sm font-medium text-gray-700">密码</label>
                <Input 
                  id="login-password" 
                  type="password" 
                  required 
                  v-model="loginData.password"
                />
              </div>
              <Button type="submit" class="w-full">登录</Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form class="space-y-4" @submit="handleSignup">
              <div>
                <label for="signup-email" class="block text-sm font-medium text-gray-700">学号</label>
                <Input 
                  id="signup-email" 
                  type="text" 
                  required 
                  v-model="signupData.studentId"
                />
              </div>
              <div>
                <label for="signup-name" class="block text-sm font-medium text-gray-700">姓名</label>
                <Input 
                  id="signup-name" 
                  type="text" 
                  required 
                  v-model="signupData.name"
                />
              </div>
              <div>
                <label for="signup-password" class="block text-sm font-medium text-gray-700">密码</label>
                <Input 
                  id="signup-password" 
                  type="password" 
                  required 
                  v-model="signupData.password"
                />
              </div>
              <div>
                <label for="signup-major" class="block text-sm font-medium text-gray-700">专业</label>
                <Input 
                  id="signup-major" 
                  type="text" 
                  required 
                  v-model="signupData.major"
                />
              </div>
              <Button type="submit" class="w-full">注册</Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </div>
</template>

<style>

</style>