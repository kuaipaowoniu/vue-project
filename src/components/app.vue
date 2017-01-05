<template>
     <transition name="slide">
       <router-view></router-view>
     </transition>
</template>
<script>
    import { mapActions  } from "vuex";
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
		  	console.log(this.$store.state.paramsPool);
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