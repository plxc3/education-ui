<template>
<div class="">
  <el-form ref="form"  label-width="80px">
    <el-form-item label="讲师名字">
      <el-input v-model="teacher.name" style="width: 200px" clearable ></el-input>
    </el-form-item>
    <el-form-item label="讲师头衔">
      <el-select v-model="teacher.level" placeholder="请选择讲师级别">
        <el-option label="高级讲师" value="1"></el-option>
        <el-option label="低级讲师" value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="注册时间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="teacher.gmtCreate" style="width: 100%;"
        value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="讲师资历">
      <el-input type="textarea" v-model="teacher.career" ></el-input>
    </el-form-item>
    <el-form-item label="讲师简介">
      <el-input type="textarea" v-model="teacher.intro" rows="15" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
  import teacherApi from "@/api/teacher.js"
    export default {
        name: "save",
      data() {
        return {
          teacher:{
          },

        }
      },
      methods: {
        onSubmit() {
          console.log(this.teacher);
          teacherApi.saveTeacher(this.teacher)
            .then(res=>{
              this.$message("保存成功")
              this.teacher={}
            }).catch(err=>{
            console.log(err)
            this.$message("操作异常")
          })
        }
      }
    }
</script>

<style scoped>

</style>
