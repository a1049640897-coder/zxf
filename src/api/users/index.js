import request from '@/utils/request';

export function getList(data) {
  return request({
    url: '/user/getList',
    method: 'post',
    data
  });
}

export function updateList(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  });
}

export function deletOrder(data) {
  return request({
    url: '/user/delete',
    method: 'put',
    data
  });
}

