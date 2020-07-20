<template>
<div class="">
  <el-steps :active="active" finish-status="success">
    <el-step title="课程基本信息"></el-step>
    <el-step title="课程大纲"></el-step>
    <el-step title="最终发布"></el-step>
  </el-steps>

<div class="From">
  <!-- Form -->
  <el-button type="text" @click="dialogFormVisible = true">添加章节信息</el-button>

  <el-dialog title="添加章节" :visible.sync="dialogFormVisible">
    <el-form :model="chapter">
      <el-form-item label="章节标题" :label-width="formLabelWidth">
        <el-input v-model="chapter.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="章节排序" :label-width="formLabelWidth">
        <el-input-number v-model="chapter.sort" :step="2"></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</div>



<div class="">

  <el-input
    placeholder="输入关键字进行过滤"
    v-model="filterText">
  </el-input>

  <el-tree
    class="filter-tree"
    :data="data"
    :props="defaultProps"
    default-expand-all
    :filter-node-method="filterNode"
    ref="tree">
  </el-tree>
</div>

  <el-button style="margin-top: 12px;" @click="previous">上一步</el-button>
  <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
</div>
</template>

<script>
  import chapterApi from "@/api/chapter"
    export default {
        name: "chapter",
      watch: {
        filterText(val) {
          this.$refs.tree.filter(val);
        }
      },
        data(){
          return{
            filterText: '',
            active:2,
            chapterList:[],
            courseId:'18',
            data:[
              {
                id: '',
                title: '',
                children: [{
                  id: '',
                  title: '',
                }]
              },
            ],
            defaultProps: {
              children: 'children',
              label: 'title'
            },
            //==============添加和修改章节的表单
            dialogFormVisible: false,
            chapter: {
            },
            formLabelWidth: '120px'
          }
        },
      methods:{
        previous(){
          this.$router.push({path:"/course/info",query:{id:this.$route.params.id}})
        },
        next(){
          this.$router.push({path:"/course/list"})
        },
        /**
         * 根据课程id查询章节和小节
         */
        getChapterVideoList(courseId){

          chapterApi.getChapterVideoByCourseID(courseId)
            .then(res=>{
              this.chapterList= res.data.courseChapterVideo
              this.data=res.data.courseChapterVideo
            }).catch(err=>console.log(err))
        },
        filterNode(value, data) {
          if (!value) return true;
          return data.title.indexOf(value) !== -1;
        }

      },
      created(){
          if(this.$route.params.id&&this.$route.params){
            this.courseId=this.$route.params.id
            this.getChapterVideoList(this.courseId)
          }

      }
    }
</script>

<style scoped>

</style>
