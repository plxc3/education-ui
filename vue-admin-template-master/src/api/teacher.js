import request from '@/utils/request'

export default {
  /**
   * 讲师列表分页查询
   */
  getTeacherList(teacherPage) {
    return request({
      url: '/service/teacher/pageteacherCondition',
      //data表示把对象转换为json进行传递到接口里面
      data: teacherPage,
      method: "post",
    })
  },
  deleteteacher(id) {
    return request({
      url: `/service/teacher/delete/${id}`,
      method: 'delete'
    })
  },
  saveTeacher(teacher) {
    return request({
      url: "/service/teacher/addTeacher",
      method: "post",
      data: teacher
    })
  },
  getteacher(id) {
    return request({
      url:`/service/teacher/${id}`,
      method:"get"
    })
  },
  update(teacher){
    return request({
      url: "/service/teacher/updateteacher",
      data:teacher,
      method:"put"
    })
  }
}
