//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
import { ElMessage } from 'element-plus'

//定义一个变量,记录公共的前缀  ,  baseURL
//const baseURL = 'http://localhost:8080';
const baseURL = '/api';
const instance = axios.create({ baseURL })



/* import {useRouter} from 'vue-router'
const router = useRouter(); */


//添加响应拦截器
instance.interceptors.response.use(
    result => {
        //判断业务状态码
        if(result.data.success===true){
            return result.data;
        }

        //操作失败
        ElMessage.error(result.data.errorMsg?result.data.errorMsg:'服务异常')
        
        //异步操作的状态转换为失败
        return Promise.reject(result.data)
        
    },
    err => {
        
        ElMessage.error('服务异常')
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

export default instance;