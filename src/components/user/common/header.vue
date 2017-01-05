<template>
  <div class="header">
      <div class="zrapper">
         <div class="logo p-xs"><img src="/resources/img/logo.png"></div>
         <div class="topbar">您好，欢迎来到MiNetwork！<span class="m-l-xs">注册</span><span class="m-r-xs m-l-xs">|</span>登录<span class="m-r-xs m-l-xs">|</span> 
         <el-dropdown menu-align="start">
            <span class="el-dropdown-link">
              语言<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>中文</el-dropdown-item>
              <el-dropdown-item>英文</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </div> </div> 
  </div>
</template>
<script>
    export default{
        name:"header",
        data(){
          return { }
        },
        computed: {
           
        },
        methods:{
         
         
        }
    }
</script>
<style scoped>
  .header{ border-bottom:solid 1px #e8e8e8; background: #fafafa; height:100px; font-size: 36px;color:#333; position: relative;background: url('/resources/img/banner2.jpg') no-repeat bottom;  }
  .header .topbar{ position: absolute;right: 10px;top:10px; font-size: 13px;color:#333; }
</style>
