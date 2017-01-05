<template>
     <!--左侧导航开始-->
     <div class="navigation">
        <nav class="navbar-default navbar-static-side" role="navigation">
            <div class="nav-close"><i class="fa fa-times-circle"></i></div>
            <div class="sidebar-collapse">
                <ul class="nav" id="side-menu" ref="sidemenu">
                    <slot name="header"></slot>
                    <!--遍历菜单-->

                    <li v-for="firstmenu in menus"  style="postion:relative" :name="firstmenu.name" @click="clickLink($event,firstmenu.name)" :class="{active:firstmenu.isActive}">
                        <a href="#" class="topsub" > 
                            <i :class="firstmenu.ico"></i>
                            <span class="nav-label">{{ firstmenu.name }}</span>
                            <span class="fa fa-angle-double-down" v-if="!!firstmenu.children"></span>
                        </a>
                        <ul class="nav submenu nav-second-level collapse" v-if="!!firstmenu.children">
                           <li v-for="secondmenu in firstmenu.children" @mousedown="clickItem($event,secondmenu)" :class="{currrent: secondActive == secondmenu.name}">
                                <a href="#" class="J_menuItem" @click.stop="clickLink($event,secondmenu)"> {{secondmenu.name}}</a>
                           </li>  
                        </ul>
                    </li>
                    <slot name="footer">
                        <li><a class="navbar-minimalize m-t-sm" @click="expand" href="#" ><i :class="{fa:true,'fa-angle-double-left':sideBarStatus.isExpand,'fa-angle-double-right':!sideBarStatus.isExpand}" style="font-size:16px;"></i> </a></li>
                    </slot>
                    <!--end遍历菜单-->
                </ul>
            </div>
        </nav>
        <!--右键菜单-->
        <cxtmenu v-if="showCxtMenu.status" :data="cxtMenus" :style="{ top:showCxtMenu.position.y+'px',
                    left:showCxtMenu.position.x+'px'}"></cxtmenu>
     
    </div>
</template>
<script>

    import { mapState,mapGetters,mapActions  } from "vuex";
    import _subMenu from "./sub-menu";
    import _contextMenu from "../common/context-menu";
    export default{
        name:"navigation",
        data(){
            return {
 
               // 选中二级TAB
               secondActive:"",
               //activeMenus:"",
               // 右键菜单
               showCxtMenu:{
                    status:false,
                    position:{
                        x:0,
                        y:0
                    }
               },
               // 右键菜单数据
               cxtMenus:null
            }
        },
        props:["menus","status","sideBarStatus"],
        components:{
            cxtmenu:_contextMenu
        },
        beforeCreate(){
           // 关闭右键
           document.oncontextmenu  = function(event){
                 let e = event || window.event;
                 e.preventDefault();
            }
        },
        computed: {
             
        },
        methods:{
            
            /**
             * 菜单伸缩
             * @return {[type]} [description]
             */
            expand(){
               
                 //关闭右键浮窗
                 this.showCxtMenu.status = false;    
                 let _body = document.querySelectorAll("body")[0];
                 let regEx= /mini-navbar/gi;
                 if(regEx.test(_body.className)){
                    _body.className = _body.className.replace(regEx,""); 
                 }else{
                    _body.className = _body.className+" "+"mini-navbar";
                }
                 this.$emit("collapseSideBar",!this.sideBarStatus.isExpand);
            },
            /**
             * 右键菜单
             * @param  {[type]} event [description]
             * @return {[type]}       [description]
             */
            clickItem(event,node){
                 let e = event || window.event;
                 this.node = node;
                 // 右键
                 if(e.which==3){ 
                 
                     this.cxtMenus = [
                           { 
                               text:"新开TAB",
                               icon:"fa fa-plus",
                               callBack:()=>{ 
                                    this.showCxtMenu.status = false;
                                    if(this.node && this.node["children"] && this.node["children"][0]){
                                        this.ROUTE_SUBMENU_SET({ routeurl:this.node["url"],submenu:this.node["children"]});
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
                     this.showCxtMenu.position = { x:160,y:e.clientY-10}
                 } 
            },
            collapseMenus(element){

       
                if(element){
             
                    var _parenNode = element.parentNode;
                    var _regEx = /active/gi
                
                   element.removeAttribute("style");
                   element.style.display = "block";
                   var totalHeight = element.offsetHeight; 
                   element.style.height = "0px"; 
                   setTimeout(function(){
                      element.style.height = totalHeight + "px";
                   },0);  
              
                }     
            },
           /**
            * 导航菜单链接触发
            * @param  {[object]} event  [description]
            * @param  {[object]} curnode [当前节点]
            */
           clickLink(event,curnode){
          
              
               //  let element = null;
               // //this.collapseMenus(this.temnode);
               //  if(event.target["className"] == "topsub"){
               //     element = event.target.nextElementSibling;
               //  }
               //  if(/nav-label|fa/gi.test(event.target["className"])){
               //   element = event.target.parentNode.nextElementSibling;
               //  }
               //  //this.nnode = element;
               //  this.collapseMenus(element);
 
                if(typeof curnode == "string"){ // 点击一级菜单
                    //this.activeName = curnode;
                     this.$emit("activeSideMenu",curnode);
                   // this.SYS_SUBMENU_SET(curnode); // 本地记忆存储
                }else{ // 点击二级菜单
                    if( curnode["children"] && curnode["children"].length != 0){
                        let args = curnode;
                         this.$router.push(args["children"][0].url); // 调出子菜单的第一个链接路由
                         this.ROUTE_SUBMENU_SET({ routeurl:args["url"],submenu:args["children"]}); // 路由子菜单存储
                         this.$emit("miniSubMenu",this.status[2]);
                         this.secondActive = args.name;
                     }else{
                        this.ROUTE_SUBMENU_SET({ routeurl:curnode.url,submenu:null}); // 路由子菜单存储
                        if(curnode.iframe){
                            this.$router.push({ path : curnode.url,query : {url:curnode.iframe}});
                        }else{
                            this.$router.push(curnode.url); 
                        }
                        this.secondActive = curnode.name;
                        this.$emit("miniSubMenu",curnode.iframe?this.status[3]:this.status[0]);
                    }
                }
                this.$nextTick();
           },
           
           ...mapActions([
              "ROUTE_SUBMENU_SET",
              //"SYS_SUBMENU_SET",
              "SYS_SUBMENU_CLEAR"
           ])
        },
        mounted(){
              
            //$("#side-menu").metisMenu();
            // 右侧边栏使用slimscroll
            $(".sidebar-container").slimScroll({
                height: "100%",
                railOpacity: 0.4,
                wheelStep: 10
            });
        }
    }
</script>
<style scoped>
    .sidebar-collapse .nav .submenu {
        transition: height 1s;
        padding:0px 0px 0px 30px;
    }
    .minisub #sidemenu{
        width:50px;
    }
    .collapse.in{
        transition:all 0.5s;
    }

</style>