import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
const TimeOut = 3600
function isCheckTimeout() {
  const currentTime = Date.now()
  const timeStamp = (currentTime - store.getters.hrsaasTime) / 1000
  return timeStamp > TimeOut
}
// 请求拦截器
request.interceptors.request.use(config => {
  if (store.getters.token) {
    if (isCheckTimeout()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token 超时'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  // console.log(config)
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(response => {
  // console.log(response)
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    // 为什么不用throw error
    return Promise.reject(new Error(message))
  }
}, error => {
  if (error.response && error.response.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
    Message.error('token 超时')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})
export default request
