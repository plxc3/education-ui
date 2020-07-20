import request from '@/utils/request'

export default {
  getAllSubject(){
    return request({
      url:"/service/edusubject/getAllSubject",
      method:"get"
      }
    )
  }
}
