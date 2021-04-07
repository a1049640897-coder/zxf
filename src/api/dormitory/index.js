import request from '@/utils/request';

export function getList(data) {
  return request({
    url: '/hotel/getList',
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
    url: '/hotel/delete',
    method: 'put',
    data
  });
}

export function addList(data) {
  return request({
    url: '/hotel/add',
    method: 'post',
    data
  });
}
