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