<template>
    <div class="main">
	    <transition :name="transitionName">
	 <!--       <router-view  class="child-view"></router-view> -->
	       <el-iframe :routeSrc="src" :dHeight="height" class="child-view"></el-iframe>
	    </transition>
    </div>
</template>
<script>
    import Bus from "../../utils/bus";
    import mixins from "../../mixins/";
    export default{
    	 mixins: [mixins],
         data () {
		    return {
		      transitionName: "slide-left",
		      src:"",
		      height:100
		    }
		  },
		  components:{
            "el-iframe":{
			  props: ["routeSrc","dHeight"],
			  template: '<iframe :src="routeSrc" border="0" :height="dHeight" frameborder="0"></iframe>'
 			}
		  },
		  mounted(){
		  	  //console.log("挂载");
		  	  this.height = document.body.clientHeight;
		  	  if(this.$route.query.url){
	  	  	      this.src = this.$route.query.url;
	  	  	  	  Bus.$emit("changeMainPageMargin","iframe");
			  	  setTimeout(()=>{
			  	  	      //console.log("定时关闭",this.isshow);
			  	  	       this.tempinstance.close();
			  	  	 	 //this.isShowingStatus = false;
			  	  },3000);
		  	  }
		      else{
                 this.$message({type:"error",message:"系统错误：无法找到页面",duration:5000,showClose:true});
		      }
		  },
		  watch: {
		    "$route"(to,from) {
		       this.transitionName = ["slide-right","slide-left"][parseInt(2*Math.random())];
		    }
		  },
    }
</script>
<style scoped>
	.fade-enter-active, .fade-leave-active {
	    transition: opacity .5s ease;
	}
	.fade-enter, .fade-leave-active {
	    opacity: 0
	}
	.child-view {
	    position: absolute;
	    width:100%;
	    transition: all .5s cubic-bezier(.55,0,.1,1);
	}
	.slide-left-enter, .slide-right-leave-active {
	    opacity: 0;
	    -webkit-transform: translate(30px, 0);
	    transform: translate(30px, 0);
	}
	.slide-left-leave-active, .slide-right-enter {
	    opacity: 0;
	    -webkit-transform: translate(-30px, 0);
	    transform: translate(-30px, 0);
	}
</style>

