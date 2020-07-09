<template>
  <div class="">

    <el-form ref="form" label-width="80px">
      <el-form-item label="头像上传">
        <el-upload
          action="http://localhost:8002/oss/fileoss/"
          ref="upload"
          list-type="picture-card"
          :on-success="handleAvatarSuccess"
          :auto-upload="false">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url" alt=""
            >
            <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-form-item>

      <el-form-item label="头像测试">
        <img :src="teacher.avatar" class="avatar"/>
      </el-form-item>

      <el-form-item label="讲师名字">
        <el-input v-model="teacher.name" style="width: 200px" clearable></el-input>
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
        <el-input type="textarea" v-model="teacher.career"></el-input>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input type="textarea" v-model="teacher.intro" rows="15"></el-input>
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
        teacher: {
          avatar:"https://plxc.oss-cn-chengdu.aliyuncs.com/2020/07/09/c96c926e532f4025a0f3496eb01f5ad41.jpg"
        },
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false
      }
    },
    methods: {
      onSubmit() {
        console.log(this.teacher);
        teacherApi.saveTeacher(this.teacher)
          .then(res => {
            this.$message("保存成功")
            this.teacher = {}
          }).catch(err => {
          console.log(err)
          this.$message("操作异常")
        })
      },
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      //上传成功后的回调函数
      handleAvatarSuccess(res) {
        this.teacher.avatar = res.data.url
        console.log(this.teacher)
      },

    }
  }
</script>

<style scoped>
  .avatar{
    width: 188px;
    height: 188px;
    border-radius: 50%;
    border: 1px solid #000;
  }

</style>
