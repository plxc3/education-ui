import request from '@/utils/request'

export default {

  getChapterVideoByCourseID(courseId){
    return request({
      url:`/service/edu-chapter/getChapterVideo/`+courseId,
      method:'get'
    })
  }
}
