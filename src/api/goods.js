import request from '@/utils/request'

export function uploadImage(params) {
  return request({
    url:'/banner/uploadImage',
    method:'post',
    //params:params
    data:params,
    processData: false,//必写
    contentType: false//必写
  })
}
export function addData(params) {
  return request({
    url:'/goods/insert',
    method:'post',
    dataType: 'json',
    transformRequest: [function(params) {
      return JSON.stringify(params)
    }],
    headers: {
      'Content-Type': 'application/json'
    },
    data:params
  })
}
export function createMerchantinfo(data) {
  return request({
    url: 'tenant/mc/merchantinfo/add',
    method: 'post',
    dataType: 'json',
    transformRequest: [function(data) {
      return JSON.stringify(data)
    }],
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
export function getDataByPage(params) {
  return request({
    url:'/goods/list',
    method:'post',
    data:params
  })
}
export function deleteGoods(id) {
  return request({
    url:'/goods/delete/'+id,
    method:'post'
  })
}
