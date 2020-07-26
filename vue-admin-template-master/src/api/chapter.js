import request from '@/utils/request'

export default {

  getChapterVideoByCourseID(courseId){
    return request({
      url:`/service/edu-chapter/getChapterVideo/`+courseId,
      method:'get'
    })
  },
  addChapter(chapter){
    return request({
      url:"/service/edu-chapter/addChapter",
      method:"post",
      data:chapter
    })
  },
  deleteChapter(chapterId){
    return request({
      url:"/service/edu-chapter/deleteChapter/" +chapterId,
      method:"delete"
    })
  },
  updateChpater(chapter){
    return request({
      url:"/service/edu-chapter/updateChapter",
      data:chapter,
      method:"post"
    })
  }
}
