<template>
<div class="">
  <el-steps :active="active" finish-status="success">
    <el-step title="课程基本信息"></el-step>
    <el-step title="课程大纲"></el-step>
    <el-step title="最终发布"></el-step>
  </el-steps>

<div class="From">
  <!-- Form Chapter -->
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
      <el-button type="primary" @click="addChapter">确 定</el-button>
    </div>
  </el-dialog>
</div>

  <!--隐藏表单video的添加-->
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    >
    <el-form :model="chapter">
      <el-form-item label="小章节标题" :label-width="formLabelWidth">
        <el-input v-model="video.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="小章节排序" :label-width="formLabelWidth">
        <el-input-number v-model="video.sort" :step="2"></el-input-number>
      </el-form-item>
      <el-form-item label="是否免费">
        <el-radio-group v-model="video.isFree" size="medium">
          <el-radio label="true">免费</el-radio>
          <el-radio label="false">默认</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveVideo">确 定</el-button>
  </span>
  </el-dialog>

<!--列表的显示-->
<div class="">

  <el-input
    placeholder="输入关键字进行过滤"
    v-model="filterText">
  </el-input>

  <!--<el-tree-->
    <!--class="filter-tree"-->
    <!--show-checkbox-->
    <!--:data="data"-->
    <!--:props="defaultProps"-->
    <!--default-expand-all-->
    <!--:filter-node-method="filterNode"-->
    <!--ref="tree">-->
   <!--<span class="custom-tree-node" slot-scope="{ node,data }">-->
        <!--<span>{{ node.label }}</span>-->
        <!--<span>-->
             <!--<el-button-->
               <!--type="text"-->
               <!--size="mini"-->
               <!--@click="addVideo(data)">-->
            <!--添加小章节-->
          <!--</el-button>-->
          <!--<el-button-->
            <!--type="text"-->
            <!--size="mini"-->
            <!--@click="() => updateChapter(data)">-->
            <!--Update-->
          <!--</el-button>-->
          <!--<el-button-->
            <!--type="text"-->
            <!--size="mini"-->
            <!--@click="() => remove(data)">-->
            <!--Delete-->
          <!--</el-button>-->
        <!--</span>-->
      <!--</span>-->
  <!--</el-tree>-->
  <div class="CHAPTER">
    <transition name="fade">
      <!--章节-->
      <ul class="chanpterList"  >
        <li v-for="chapter in data"  >
          <p>
            {{ chapter.title }}
            <span class="acts">
              <el-button type="text"v-on:click="()=>{show=!show}">展开</el-button>
            <el-button style="" type="text" @click="addVideo(chapter.id)">添加小节</el-button>
            <el-button style="" type="text" @click="updateChapter(chapter.id)">编辑</el-button>
            <el-button type="text" @click="remove(chapter.id)">删除</el-button>
            </span>
          </p>
          <ul v-show="show" class="chanpterList videoList">
            <li v-for="child in chapter.children" class="chanpterList videoList">
              <p>{{child.title}}</p>
              <span class="acts">
          <el-button type="text" @click="deletechild(child.id)">删除小节</el-button>
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </transition>
  </div>


</div>

  <el-button style="margin-top: 12px;" @click="previous">上一步</el-button>
  <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
</div>
</template>

<script>
  import chapterApi from "@/api/chapter"
  import videoApi from "@/api/video"
    export default {
        name: "chapter",
      watch: {
        filterText(val) {
          this.$refs.tree.filter(val);
        }
      },
        data(){
          return{
            show:"true",
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
            //==============添加和修改章节的表单
            dialogFormVisible: false,
            /**
             * 隐藏video表单
             * */
            dialogVisible:false,
            chapter: {
              courseId:''
            },
            formLabelWidth: '120px',
          //  video
            video:{
              courseId:'',
              chapterId:''
            },
          }
        },
      methods:{
        previous(){
          this.$router.push({path:"/course/info",query:{id:this.$route.params.id}})
        },
        next(){
          this.$router.push({path:"/course/publish/"+this.courseId})
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
        },
        /**
         * 添加章节
         */
        addChapter(){
          if(!this.chapter.id){
            chapterApi.addChapter(this.chapter)
              .then(res=>{
                  /**
                   * 关闭表单
                   * @type {boolean}
                   */
                  this.dialogFormVisible=false
                  this.$message("添加成功")
                  /**
                   * 刷新页面
                   */
                  this.getChapterVideoList(this.courseId)

                }
              )
          }else {
            chapterApi.updateChpater(this.chapter)
              .then(res=>{
                this.dialogFormVisible=false
                this.$message("修改成功")
                this.getChapterVideoList(this.courseId)
              })

          }
        },
        /**
         * 删除章节
         */remove(id) {
          chapterApi.deleteChapter(id)
          this.getChapterVideoList(this.courseId)
        },
        /**
         * 修改章节
         */
        updateChapter(id){
          this.dialogFormVisible=true
          this.chapter.id=id
        },
        /**
         * addVideo添加小章节
         */
        addVideo(id){
          this.dialogVisible=true
          this.video.chapterId=id
        },
        saveVideo(){
          videoApi.savevideo(this.video)
            .then(res=>{
              this.dialogVisible=false
              this.getChapterVideoList(this.courseId)
            })
          console.log(this.video)
        },
        /**
         * 删除小章节
         */
        deletechild(id){
          videoApi.deleteVideo(id)
            .then(res=>{
              this.$message("删除成功")
              this.getChapterVideoList(this.courseId)
            })
        }
      },
      created(){
          if(this.$route.params.id&&this.$route.params){
            this.chapter={}
            this.courseId=this.$route.params.id
            this.chapter.courseId=this.$route.params.id
            this.video.courseId=this.courseId
            this.getChapterVideoList(this.courseId)
          }

      }
    }
</script>

<style scoped>

  .chanpterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .chanpterList li{
    position: relative;
  }
  .chanpterList p{
    float: left;
    font-size: 20px;
    margin: 10px 0;
    padding: 10px;
    height: 70px;
    line-height: 50px;
    width: 100%;
    border: 1px solid #DDD;
  }
  .chanpterList .acts {
    float: right;
    font-size: 14px;
  }

  .videoList{
    padding-left: 50px;
  }
  .videoList p{
    float: left;
    font-size: 14px;
    margin: 10px 0;
    padding: 10px;
    height: 50px;
    line-height: 30px;
    width: 100%;
    border: 1px dotted #DDD;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
