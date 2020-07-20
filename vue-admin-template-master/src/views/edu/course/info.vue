<template>
<div class="">
  <el-steps :active="active" finish-status="success">
    <el-step title="课程基本信息"></el-step>
    <el-step title="课程大纲"></el-step>
    <el-step title="最终发布"></el-step>
  </el-steps>

  <el-form ref="from" :model="course" label-width="80px">

    <el-form-item label="课程封面" >
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8002/oss/fileoss/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <!--通过img标签进行回显示-->
        <img :src="course.cover" alt="">
        <!--<img :src="course" alt="">-->
      </el-upload>
    </el-form-item>


    <el-form-item label="课程名称" >
      <el-input v-model="course.title" class="basic"></el-input>
    </el-form-item>
    <el-form-item label="课程价格" class="basic">
      <el-input-number v-model="course.price" :step="5"></el-input-number>
    </el-form-item>
    <el-form-item label="课程总课时">
      <el-input-number v-model="course.lessonNum" :step="5"></el-input-number>
    </el-form-item>
    <el-form-item label="课程简介">
      <tinymce :height="300" v-model="course.description"/>
    </el-form-item>
    <el-form-item label="教师列表">
      <el-select v-model="course.teacherId" placeholder="请选择教师">
        <el-option v-for="teacher in teacherlist" :label="teacher.name" :value="teacher.id" :key="teacher.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="课程选择" >

      <el-select placeholder="请选择一级课程" v-model="course.subjectParentId" @change="onChange">
      <el-option v-for="onesubject in onesubjectlist" :label="onesubject.title" :value="onesubject.id" :key="onesubject.id" ></el-option>
    </el-select>

      <el-select placeholder="请选择二级课程" v-model="course.subjectId">
        <el-option v-for="onesubject in twosubjectlist" :label="onesubject.title" :value="onesubject.id" :key="onesubject.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
    </el-form-item>
  </el-form>

  <el-button style="margin-top: 12px;" @click="previous">上一步</el-button>
  <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
</div>
</template>

<script>
  import courseApi from "@/api/course.js"
  import teacherApi from "@/api/teacher.js"
  import subjiectApi from "@/api/subject.js"
  import Tinymce from '@/components/Tinymce'
    export default {
        name: "info",
      components:{
        Tinymce,
      },
      data() {
        return {
          active: 0,
          course:{
            title: '',
            subjectId: '',//二级分类id
            subjectParentId:'',//一级分类id
            teacherId: '',
            lessonNum: 0,
            description: '',
            cover: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
            price: 0

          },
          teacherlist:[],
          onesubjectlist:[],
          twosubjectlist:[],
          oneSubjectId:'',
          dialogImageUrl: '',
          dialogVisible: false,
          disabled: false,
          courseId:"",
        };
      },

      methods: {
        next() {
          /**
           * 判断是修改还是保存操作
           */
          if(!this.course.id){
            /**
             * 添加
             */
            courseApi.addCourseInfo(this.course)
              .then(res=>{
                console.log(res)
                this.$message("保存成功")
                // this.$router.push({path:"/course/chapter/",query:{id:res.data.courseId}})
                this.$router.push({path:"/course/chapter/"+res.data.courseId})
              }).catch(err=>{
              console.log(err)
            })
          }
          else {
            /**
             * 修改
             */
            courseApi.updateCourseInfo(this.course)
              .then(res=>{
                this.$message("修改成功")
                this.$router.push({path:"/course/chapter/"+this.course.id})
              })
          }
        },
        previous(){

        },
        getTeacherList(){
          teacherApi.findall()
            .then(res=>{
              this.teacherlist=res.data.teacherlist
              console.log(this.teacherlist)
            })

        },
        /**
         * 获得封装有二级分类的一级分类的列表
         */
        getOneSubjectList(){
          subjiectApi.getAllSubject()
            .then(res=>{
              console.log(res)
              this.onesubjectlist=res.data.subject
            })
        },
        /**
         * 每次选择一级分类后，往二级分类列表里注入一级分类的children
         */
        onChange(){
          for(let i=0;i<this.onesubjectlist.length;i++){
            if(this.onesubjectlist[i].id==this.course.subjectParentId){
              this.twosubjectlist=this.onesubjectlist[i].children
              /**
               * 每次选择后进行清空
               * @type {string}
               */
              this.course.subjectId=''
            }
          }
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        /**
         * 上传成功后的回调函数
         */
        handleAvatarSuccess(res){
          console.log(res)
          this.course.cover=res.data.url
          this.dialogImageUrl=res.data.url
        },
        getCourseInfo(courseId){
          courseApi.getCourseInfo(courseId)
            .then(res=>{
              console.log(res.data.courseInfo)
              this.course=res.data.courseInfo
              subjiectApi.getAllSubject()
                .then(res=>{
                  /**
                   * ui框架自己做了封装方法，会自动进行id比较，选出一样id的进行值显示
                   */
                  this.onesubjectlist=res.data.subject
                  for(let i=0;i<this.onesubjectlist.length;i++){
                    if(this.onesubjectlist[i].id==this.course.subjectParentId){
                      this.twosubjectlist=this.onesubjectlist[i].children
                    }
                  }
                  this.getTeacherList()
                }).catch(err=>console.log(err))

            }).catch(err=>console.log(err))
        },
      },
      created(){
            if(this.$route.query&&this.$route.query.id){
                  this.courseId=this.$route.query.id
                  this.getCourseInfo(this.courseId)
            }else {
              //初始化教师列表
              this.getTeacherList(),
                //初始化课程列表
                this.getOneSubjectList()
            }
      }
    }
</script>

<style scoped>
.avatar-uploader img{
  width: 200px;
  height: 200px;
}
  .basic{
    width: 200px;
  }
.tinymce-container {
  line-height: 29px;
}

</style>
