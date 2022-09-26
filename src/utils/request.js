import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
request.interceptors.request.use(config => {
  if (store.getters.token) {
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
  Message.error(error.message)
  return Promise.reject(error)
})
export default request
