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
    url:'/banner/insert',
    method:'post',
    data:params
  })
}
export function getDataByPage(params) {
  return request({
    url:'/banner/list',
    method:'post',
    data:params
  })
}
export function deleteBanner(id) {
  return request({
    url:'/banner/delete/'+id,
    method:'post'
  })
}
