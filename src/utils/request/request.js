import store from '@/store/index'
import { MessageBox } from "element-ui";
import router from '@/router'
import axios from "axios"
import { Message } from "element-ui"
axios.defaults.timeout = 6000; // 请求超时时间

/** 区分打包环境与开发环境
 * process.env.NODE_ENV==='production'  (打包环境)
 * process.env.NODE_ENV==='development' (开发环境)
 */

axios.defaults.baseURL = "http://127.0.0.1:3030/api"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // post请求头的设置
//设置跨域访问

axios.interceptors.request.use(
  config => {
    if(config.path != '/api/login' && config.path != '/register'){
      config.headers.Token = window.sessionStorage.getItem("Token")
      return config
    }
    return config
  },
  error => {
    return error
  });

axios.interceptors.response.use(
  config => {
    if(config.data.meta.status == 403){
      console.log("00000000000"); 
      router.push("/login")  
      Message.error('登录已过期,请重新登录')
      return false 
    }
    return config
  },
  error => {
    return new Promise().reject(error)
  }
)

class http {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, { params })
        .then(res => resolve(res.data))
        .catch(err => reject(err.data))
    })
  }

  post(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  }

  put(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.put(url, params)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  }

  delete(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url, params)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  }
}
export default new http()