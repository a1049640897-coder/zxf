import request from '@/utils/request';

export function getList(data) {
  return request({
    url: '/comment/getList',
    method: 'post',
    data
  });
}

export function updateList(data) {
  return request({
    url: '/hotel/update',
    method: 'post',
    data
  });
}

export function deletList(data) {
  return request({
    url: '/comment/delete',
    method: 'put',
    data
  });
}

export function addList(data) {
  return request({
    url: '/comment/add',
    method: 'post',
    data
  });
}

export function getUser(data) {
  return request({
    url: '/user/getById',
    method: 'post',
    data
  });
}
