import request from '@/utils/request.js'

export function login(data) {
  return request({
    method: 'POST',
    url: '/sys/login',
    data
  })
}
