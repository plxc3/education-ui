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
  }
}
