<template>
  <div id="home" class="row">
     <div class="col-sm-12 border-bottom p-sm">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">管理中心</el-breadcrumb-item>
          <el-breadcrumb-item>主页</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="col-sm-10">
          <h2>欢迎来到MINETWORK</h2>
      </div>
  </div>
</template>

<script>
    import { mapGetters,mapActions  } from "vuex";
	export default {
		 name: "home",
		 data(){
		  	return {
		  		
		  	}
		 },
		 mounted(){ 
	         this.initParamsPool();
		 },
		 methods:{
		  // 初始化参数
		  initParamsPool(){
		    if(this.$utils.isEmptyObject(this.$store.state.paramsPool)){

		      this.$resource("/api/dict/getall",{items:"moneyPayment,userGrade,userStatus"}).get().then((data)=>{
		          let _data = data.data;
		          if(_data.status == 1){
   		             this.SETPARAMSPOOL(this.$utils.reGroupJson(_data.data));
		          }    
		      });
		    } 
		  },
		  ...mapActions([
		      "SETPARAMSPOOL"
		  ])
		}
	}
</script>
<style>

</style>
