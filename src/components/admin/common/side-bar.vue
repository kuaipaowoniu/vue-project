<template>
      <!--左侧导航开始-->
     <div class="navigation">
        <nav class="navbar-default navbar-static-side" role="navigation">
            <div class="nav-close"><i class="fa fa-times-circle"></i></div>
            <div class="sidebar-collapse">
                <ul class="nav" id="side-menu" ref="sidemenu">
                    <slot name="header"></slot>
                    <!--遍历菜单-->
                    <side-bar-item v-for="menu in data"  :cxtMenu="cxtMenu" :status="status" @handleItemClick="handleItemClick" :data="menu" :name="menu.name"></side-bar-item>
                    <!--end遍历菜单-->
                    <slot name="footer">
                      <li><a class="navbar-minimalize m-t-sm" @click="handleExpand" href="#" ><i :class="{fa:true,'fa-angle-double-left':isExpand,'fa-angle-double-right':!isExpand}" style="font-size:16px;"></i> </a></li>
                    </slot>
                </ul>
            </div>
        </nav>
        <slot name="other">
         <!--右键菜单-->
         <cxtmenu v-if="showCxtMenu.status" :data="cxtMenus" :style="{ top:showCxtMenu.position.y+'px',
                    left:showCxtMenu.position.x+'px'}"></cxtmenu>
        </slot>
     
    </div>
</template>
<script>
  import { mapState,mapGetters,mapActions  } from "vuex";
  import sideBarItem from "./side-bar-item";
  import _contextMenu from "./context-menu";
  import Bus from "../../../utils/bus";
	export default{
    name:"sideBarComponet",
    data(){
      return {
        activeNames:[],
        // 菜单是否收缩
        isExpand:true,
        showCxtMenu:{
            status:false,
            position:{
                x:0,
                y:0
            }
        },
        cxtMenus:null
      }
    },
    props:["data","accordion","cxtMenu","status"],
	  components:{
      "sideBarItem":sideBarItem,
       cxtmenu:_contextMenu
    },

    methods:{
        /**
        * 收/伸菜单栏
        * @param  {[type]} val [description]
      */
      handleExpand(){
         let _body = document.querySelectorAll("body")[0];
         let regEx= /mini-navbar/gi;
         if(regEx.test(_body.className)){
            this.isExpand = true;
            _body.className = _body.className.replace(regEx,""); 
         }else{
            this.isExpand = false;
            _body.className = _body.className+" "+"mini-navbar";
        }
      },
      /**
       * li点击反应菜单的伸缩效果
       * @param  {[type]} val [description]
       * @return {[type]}     [description]
       */
      handleItemClick(val){
        if(this.accordion){
           this.activeNames.length = 0;
           this.activeNames.push(val);
        }else{
          let index = this.activeNames.indexOf(val);
          if(index > -1){
             this.activeNames.splice(index,1); 
          }else{
             this.activeNames.push(val); 
          }
        }
      },
      /**
       * 右键菜单//响应子组件点击事件
       * @param  {[type]} el   [子组件DOM元素]
       * @param  {[type]} node [子组件DOM对应的数据对象]
       * @return {[type]}      [description]
       */
      cxtRightClick(el,node){
          
          this.node = node;
          this.cxtMenus = [
                 { 
                     text:"新开TAB",
                     icon:"fa fa-plus",
                     callBack:()=>{ 
                          this.showCxtMenu.status = false;
                          if(this.node && this.node["children"] && this.node["children"][0]){
                              Bus.$emit("busRightClick",{ routeurl:this.node["url"],submenu:this.node["children"]});
                              //this.ROUTE_SUBMENU_SET({ routeurl:this.node["url"],submenu:this.node["children"]});
                              window.open(this.node["children"][0]["url"],this.node["children"][0]["name"]);
                          }else{
                              window.open(this.node["url"],this.node["name"]);
                          }
                     } 
                 },
                 { text:"编辑",icon:"fa fa-edit"},
                 { text:"关闭",icon:"fa fa-remove",callBack:()=>{ 
                      this.showCxtMenu.status = false;      
                 }}
           ];
           this.showCxtMenu.status=true;
          // this.showCxtMenu.position = { x:e.clientX,y:e.clientY}
           this.showCxtMenu.position = { x:160,y:el.clientY-10}
      }
    },
    beforeCreate(){
      //if(this.cxtMenu){
         // 关闭右键
         document.oncontextmenu  = function(event){
               let e = event || window.event;
               e.preventDefault();
          }
      //}
    },
    created(){
        Bus.$on("cxtRightClick",(el,node)=>{
             this.cxtRightClick(el,node);
        });
    },
    mounted(){
      // 埋入选中效果
      this.data.map((item)=>{
         if(item.isActive){
            if(this.accordion && this.activeNames.length !== 0){
               return;
            }
            this.activeNames.push(item.name);
         }   
      })
      //this.isExpand = false;
    }
  }
</script>
<style scoped>
    .minisub #sidemenu{
         width:50px;
         color:red;
    }
</style>