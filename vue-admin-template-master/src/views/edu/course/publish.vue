<template>
<div class="">
  <!--页面-->
  <el-steps :active="active" finish-status="success">
    <el-step title="课程基本信息"></el-step>
    <el-step title="课程大纲"></el-step>
    <el-step title="最终发布"></el-step>
  </el-steps>



<div class="container">
  <!--信息展示-->
  <div class="Aside">
    <img :src="publishInfo.cover" alt="">
  </div>
  <div class="Main">
    <ul>
      <li>
        <h1>课程名称：{{publishInfo.title}}</h1>
      </li>
      <li>
        <p>课程价格:{{publishInfo.price}}</p>
      </li>
      <li>
        <p>课程老师：{{publishInfo.teacherName}}</p>
      </li>
      <li>
        <p>一级课程：{{publishInfo.subjectOne}}</p>
      </li>
      <li><p>二级课程：{{publishInfo.subjectTwo}}</p></li>
      <li><p>总课时:{{publishInfo.lessonNum}}</p></li>
      <li><p>课程状态：{{publishInfo.status}}</p></li>
    </ul>
  </div>
  <el-button style="margin-top: 12px;" @click="previous">上一步</el-button>
  <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
</div>


</div>
</template>

<script>
  import courseApi from "@/api/course.js"
    export default {
        name: "publish",
        data(){
          return{
            active:3,
            courseId:'',
            publishInfo:{}
          }
      },
      methods:{
        previous(){
            this.$router.push({path:"/course/chapter/"+this.courseId})
        },
        next(){
          courseApi.finalPublish(this.courseId)
            .then(res=>{
              this.$message({
                message:"发布成功",
                type:"success"
              })
            })
        },
        getpublishInfo(courseId){

          courseApi.getPublishInfo(courseId)
            .then(res=>{
              console.log(res)
              this.publishInfo=res.data.publishInfo
            })
        }

      },
      created(){
          if(this.$route.params&&this.$route.params.id){
            this.courseId=this.$route.params.id
            this.getpublishInfo(this.courseId)
          }
      }
    }
</script>

<style scoped>

.container{
  margin: 20px;
  overflow: hidden;
  width: 100%;
  margin-left: 400px;
}

.Main{
  float: left;
  width: 70%;
  height: 400px;
  display: flex;
  justify-content: left;
  align-items: flex-start;
}
  .Aside{
    float: left;
    width: 30%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .Aside img{
    height: 400px;
    width: 400px;
  }
  .Main ul{
    list-style-type: none;
  }
  .Main ul li p{
    font-size: 16px;
    font-weight: 600;
  }



</style>
