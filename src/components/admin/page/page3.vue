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
         	<h1>实名认证</h1>
         	<ul class="items">
         		<li v-for="item in lists"  @mousedown="clickItem($event,item)">{{ item.title}}</li>
         	</ul>
         	<cxtmenu v-if="showcxtmenu.status" :data="menus" :style="{ top:showcxtmenu.position.y+'px',
                    left:showcxtmenu.position.x+'px'}"></cxtmenu>
         </div>
    </div>
</template>

<script>
    import _contextMenu from "../common/context-menu";
	export default {
	   name:"page3",
	   data(){
	   	  return {
	   	  	 showcxtmenu:{
	   	  	 	status:false,
	   	  	 	position:{
	   	  	 		x:0,
	   	  	 		y:0
	   	  	 	}
	   	  	 },
	   	  	 lists:[
                { title:"测试标题00001"},
                { title:"测试标题00002"},
                { title:"测试标题00003"},
                { title:"测试标题00004"},
                { title:"测试标题00005"},
                { title:"测试标题00006"},
                { title:"测试标题00007"},
                { title:"测试标题00008"},
                { title:"测试标题00009"},
                { title:"测试标题00010"},
                { title:"测试标题00011"},
                { title:"测试标题00012"},
                { title:"测试标题00013"},
                { title:"测试标题00014"},
                { title:"测试标题00015"},
                { title:"测试标题00016"},
	   	  	 ],
	   	  	 menus:null
	   	  }
	   },
	   beforeCreate(){
           let vm = this;
           document.oncontextmenu  = function(event){
           	     let e = event || window.event;
				       e.preventDefault();
			     }
	   },
       components:{
           cxtmenu:_contextMenu
       },
       methods:{
       	  clickItem(event){
       	     let e = event || window.event;
       	     // 右键
             if(e.which==3){ 
                 this.menus = [
		               { text:"新开TAB",icon:"fa fa-plus",callBack:function(){ console.log("回调");}},
		               { text:"编辑",icon:"fa fa-edit"},
		               { text:"删除",icon:"fa fa-remove"}
			   	 ];
				 this.showcxtmenu.status=true;
				 this.showcxtmenu.position = { x:e.clientX,y:e.clientY}
             } 
       	  }
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
