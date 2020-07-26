<template>
<div class="">
  <el-table
    :data="courseList"
    style="width: 100%">
    <el-table-column
      label="创建日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row .gmtModified}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="课程名称"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-s-help"></i>
        <span style="margin-left: 10px">{{ scope.row .title}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="课程状态"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-s-help"></i>
        <span style="margin-left: 10px">{{ scope.row .status==='Draft' ? "未发布" : "已发布"}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="总课时数"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-s-help"></i>
        <span style="margin-left: 10px">{{ scope.row .lessonNum}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <span class="demonstration">完整功能</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.current"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="query.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="query.total">
    </el-pagination>
  </div>
</div>
</template>

<script>
  import courseApi from "@/api/course.js"

    export default {
        name: "list",
      data() {
        return {
          courseList:[

          ],
          query:{
            current:1,
            size:10,
            total:1
          }
        }
      },
      methods: {
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
          courseApi.deleteListCourseInfo(row.id)
            .then(res=>{
              this.$message({
                message:"删除成功",
                type:"success"
              }),
                this.getCourseList()
            })
        },
        /**
         * 获取课程列表
         */
        getCourseList(){
          courseApi.courseList(this.query)
            .then(res=>{
              console.log((res))
              this.courseList=res.data.coursePage.publishInfoVoList
              this.query.total=res.data.coursePage.total
            })
        },
        /**
         * page
         */
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.query.size=val
          this.getCourseList()
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.query.current=val
          this.getCourseList()
        }

      },
      created(){
          this.getCourseList()
      }
    }
</script>

<style scoped>

</style>
