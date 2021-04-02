import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/AccAdmin/doLogin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/AccAdmin/fristOpenAdmin',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
