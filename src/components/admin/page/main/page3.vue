<template>
    <div class="row">
        <div class="col-sm-12 border-bottom p-sm">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }"><i class="fa fa-home m-r-xs f-16"></i>管理中心</el-breadcrumb-item>
              <el-breadcrumb-item>用户管理</el-breadcrumb-item>
              <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
         <div class="col-sm-12 sreach m-t-sm">
           	<h1>示例页面3</h1>
   
         </div>
    </div>
</template>

<script>
  import mixins from "../../../../mixins/";
  export default {
    name: "main-page1",
    mixins: [mixins],
    methods:{
      onSubmit(){
        this.isShowingStatus = true;
      }
    },
    mounted(){

       setTimeout(()=>{
   
             //this.isShowingStatus = false;
                           this.tempinstance.close();
       },1000)
    
    } 
  }
</script>
<style scoped>
   .items li{
   		height: 40px;
   		line-height: 40px;
   		border-bottom: solid 1px #e8e8e8;
   }
</style>
