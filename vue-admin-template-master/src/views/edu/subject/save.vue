<template>
<div class="">
  <el-upload
    class="upload-demo"
    ref="upload"
    action="http://localhost:8001/service/edusubject/addsubject"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :on-success="success"
    :auto-upload="false">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <div slot="tip" class="el-upload__tip">只能上传xls文件，且不超过500kb</div>
  </el-upload>
</div>
</template>

<script>
    export default {
        name: "save",
      data() {
        return {
          fileList: []
        };
      },
      methods: {
        submitUpload() {
          this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        success(res){
          console.log(res)
          this.$message("文件上传成功")
        }
      }

    }
</script>

<style scoped>

</style>
