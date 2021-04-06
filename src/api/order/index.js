import request from '@/utils/request';

export function getList(data) {
  return request({
    url: '/order/getList',
    method: 'post',
    data
  });
}

export function updateList(data) {
  return request({
    url: '/order/update',
    method: 'post',
    data
  });
}

export function deletOrder(data) {
  return request({
    url: '/order/delete',
    method: 'put',
    data
  });
}
