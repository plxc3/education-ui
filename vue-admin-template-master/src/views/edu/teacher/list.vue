<template>
  <div class="">
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="教师名字">
        <el-input v-model="query.name" placeholder="教师名字"></el-input>
      </el-form-item>
      <el-form-item label="头衔">
        <el-input v-model="query.level" placeholder="头衔"></el-input>
      </el-form-item>
      <el-form-item label="开始日期">
        <el-date-picker
          v-model="query.begin"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="截止日期">
        <el-date-picker
          v-model="query.end"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="teacherlist"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        label="level">
        <template slot-scope="scope">
          <!--scope.row表示这行的数据-->
          <span>{{ scope.row.level===1 ? "高级讲师" : "低级讲师"}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="intro"
        label="高级讲师简介">
      </el-table-column>
      <el-table-column
        prop="career"
        label="资历">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page=teacherPage.current
        :page-sizes="[1,5,10,20]"
        :page-size=teacherPage.size
        layout="total, sizes, prev, pager, next, jumper"
        :total="teacherPage.pages">
      </el-pagination>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form ref="form" :model="teacher" label-width="80px">
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
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="update()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import teacherApi from '@/api/teacher.js'

  export default {
    name: "list",
    methods: {
      getList(page) {
        teacherApi.getTeacherList(page)
          .then(res => {
            console.log(res)
            this.teacherlist=res.data.records;
            this.teacherPage.pages=res.data.pages
          }).catch(err => console.log(err))
      },
      handleEdit(id) {
        teacherApi.getteacher(id)
          .then(res=>{
            this.teacher=res.data.teacher
          }).catch(err=>console.log(err))
        this.dialogVisible=true
      },
      handleDelete(id) {
        console.log(id);
        teacherApi.deleteteacher(id)
          .then(res=>{
            this.$message("删除成功")
            this.getList(this.teacherPage)
          }).catch(err=>{
            console.log(err)
          this.$message("操作异常")
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.teacherPage.size=val
        this.getList(this.teacherPage)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.teacherPage.current=val
        this.getList(this.teacherPage)
      },
      onSubmit() {
        // this.query.current=this.teacherPage.current
        // this.query.size=this.teacherPage.size
        console.log(this.query)
        console.log(this.teacherlist)
        this.getList(this.query)
      },
      update(){
        teacherApi.update(this.teacher)
          .then(res=>{
            this.$message("更新成功")
          }).catch(err=>{
            console.log(err)
          this.$message("异常")
        })
        this.getList(this.teacherPage)
        this.dialogVisible=false
      }
    },
    data() {
      return {
        teacherPage: {
          current: 1,
          size: 3,
          pages:1
        },
        teacherlist: [],
        query:{
          current:1,
          size:3,
        },
        dialogVisible: false,
        teacher:{}
      }
    },
   created(){
      this.getList(this.teacherPage)
   }

  }
</script>

<style scoped>

</style>
