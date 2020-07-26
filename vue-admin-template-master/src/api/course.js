import request from '@/utils/request'

export default {
  addCourseInfo(course){
    return request({
      url:"/service/edu-course/addCourseInfo",
      method:"post",
      data:course
    })
  },
  getCourseInfo(courseId){
    return request({
      url:"/service/edu-course/getCourseInfo/"+courseId,
      method: "get"
    })
  },
  updateCourseInfo(courseInfo){
    return request({
      url:"/service/edu-course/updateCourseInfo",
      method:"post",
      data:courseInfo
    })
  },
  /**
   * 课程最终发布信息获取API
   */
  getPublishInfo(courseId){
    return request({
      url:"/service/edu-course/publishInfo/"+courseId,
      method:"get",
    })
  },
  finalPublish(courseId){
    return request({
      url:"/service/edu-course/final/"+courseId,
      method:"post",
    })
  },
  /**
   * 课程的分页查询列表显示
   */
  courseList(query){
    return request({
      url:"/service/edu-course/pageCourseInfo",
      method:"post",
      data:query
    })
  },
  /**
   * 课程所有信息删除
   */
  deleteListCourseInfo(courseId){
    return request({
      url:"/service/edu-course/deletePublisCourse/"+courseId,
      method:"delete"
    })
  }
}
