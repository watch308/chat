import request from '@/utils/request.js'

//提供调用注册接口的函数
export const userRegisterService = (registerData)=>{

    return request.post('/doSignUp',JSON.stringify(registerData), {
        headers: {
          'Content-Type': 'application/json'
        }
    });
   
}
export const userLoginService = (loginData)=>{
    return request.post('/login',JSON.stringify(loginData), {
        headers: {
          'Content-Type': 'application/json'
        }
    });
}
export const userInfoService = ()=>{
  return request.get('/userInfo');
}

export const userMessagefoService = ()=>{
  return request.get('/userMessge');
}
export const aiService = (params) => {  
  // 将 参数对象 转换为查询字符串  
  const queryString = new URLSearchParams(params).toString();  
  
  const url = `/api/ai/stream?${queryString}`;  
  
  // 创建 EventSource  
  const evtSource = new EventSource(url);  
  
  return evtSource;  
}  