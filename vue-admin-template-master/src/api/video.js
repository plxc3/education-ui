import request from '@/utils/request'

export  default {
  deleteVideo(videoId){
    return request({
      url:"/service/video/deleteVideo/"+videoId,
      method: "delete"
    })
  },
  savevideo(video){
    return request({
      url:"/service/video/addVideo",
      method: "post",
      data:video
    })
  }
}
