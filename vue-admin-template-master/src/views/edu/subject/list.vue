<template>
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
</template>

<script>
  import SubjectApi from '@/api/subject.js'
    export default {
        name: "list",
      watch: {
        filterText(val) {
          this.$refs.tree.filter(val);
        }
      },

      methods: {
        filterNode(value, data) {
          if (!value) return true;
          return data.title.indexOf(value) !== -1;
        },
        getAllSubject(){
          SubjectApi.getAllSubject()
            .then(res=>{
              console.log(res)
              this.data=res.data.subject;
            })
        }
      },

      data() {
        return {
          filterText: '',
          data: [{
            id: "",
            title: '',
            children: [{
              id: "",
              title: '',
            }]
          }],
          defaultProps: {
            children: 'children',
            label: 'title'
          }
    }},
    created(){
          this.getAllSubject();
    }
    }
</script>

<style scoped>

</style>
