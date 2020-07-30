import request from '@/utils/request'

export default {
  reomoveVideo(id){
    return request({
      url:"/vod/video/removeVideo"+id,
      method:"post"
    })
  }
}
