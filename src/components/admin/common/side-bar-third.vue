<template>
     <!--左侧导航开始-->
     <div id="navigation">
          <!--菜单栏-->
          <side-bar :data="menus" :accordion="accordion" :cxtMenu="false" :status="status">
            <!--扩展菜单头部-->
            <li class="nav-header" slot="header">
                    <div class="dropdown profile-element">
                        <span><img alt="image" class="img-circle" src="/resources/img/profile_small.jpg" /></span>
                        <a data-toggle="dropdown" class="user dropdown-toggle" href="#">
                            <span class="clear">
                            <span class="block m-t-xs"><strong class="font-bold">Beaut-zihan</strong></span>
                            <span class="text-muted text-xs block">超级管理员<b class="caret"></b></span>
                            </span>
                        </a>
                        <ul class="dropdown-menu animated fadeInRight m-t-xs">
                            <li><a class="J_menuItem" href="form_avatar.html">修改头像</a></li>
                            <li><a class="J_menuItem" href="profile.html">个人资料</a></li>
                            <li><a class="J_menuItem" href="contacts.html">联系我们</a></li>
                            <li><a class="J_menuItem" href="mailbox.html">信箱</a></li>
                            <li class="divider"></li>
                            <li><a href="login.html">安全退出</a></li>
                        </ul>
                    </div>
                    <div class="logo-element">H+
                    </div>
            </li>
            <!--扩展菜单尾部-->
  
            <!--右键组件-->
            <slot name="other"></slot>

          </side-bar>
          <!--左侧导航三级子导航-->
          <div class="sidemenu" id="sidemenu" v-if="!!getRoutesSubMenu">
                <sub-menu :menus="getRoutesSubMenu" :status="status">
                   
                </sub-menu>
          </div>
     </div>
</template>
<script>
  import { mapState,mapGetters,mapActions  } from "vuex";
  import Bus from "../../../utils/bus";
  import sideBar from "./side-bar";
  import _subMenu from "./sub-menu";

	export default{
    name:"sideBarComponet",
    data(){
      return {
        // 三级侧边栏状态值：
        status : ["nosub","minimenu","normalsub","iframe"],
        // 三级侧边栏状态值：{ 0:隐藏,1:迷你状态，2：正常扩展,3:iframe模式}
        subMenuStatus : "normalsub",
        accordion:true,
        // 菜单数据
        menus :[
                 {
                      name: "系统主页",enname: "sysmain", ico: "fa fa-home",isActive:false, url: "/ucenter/main",children: [
                          { name: "主页示例一",enname: "main-page1", ico: "", isActive:false, url: "/ucenter/main/page1" },
                          { name: "主页示例二",enname: "main-page2", ico: "", isActive:false, url: "/ucenter/main/page2" }, 
                          { name: "主页示例三",enname: "main-page3", ico: "",  isActive:false, url: "/ucenter/main/page3"}, 
                          { name: "路由外链接",enname: "main-page4", iframe:"https://www.iviewui.com/components/circle", ico: "", isActive:false, url: "/ucenter/main/page4"}
                      ]
                  },

                 {
                      name: "用户中心",enname: "usermange",ico: "fa fa-users", isActive:false, url: "/ucenter/users",root: true,children: [
                      { 
                          name: "帐号管理",enname: "userlist",ico: "fa fa-users",isActive:false, url: "/ucenter/users/account",children: [
                              { name: "帐号资料",enname: "userlist",ico: "fa fa-tags",isActive:false, url: "/ucenter/users/account/list"},
                              { name: "产品价格",enname: "userlist",ico: "fa fa-tags",isActive:false, url: "/ucenter/users/account/page2"}, 
                              { name: "实名认证",enname: "userlist",ico: "fa fa-tags",isActive:false, url: "/ucenter/users/account/page3"}, 
                              { name: "登录日志",enname: "userlist",ico: "fa fa-tags",isActive:false, url: "/ucenter/users/account/page4"}
                          ]
                      }, 
                      {
                          name: "财务管理", enname: "userlist",ico: "", isActive:false, url: "/ucenter/users/finance",children: [
                              { name: "帐户明细",enname: "userlist",ico: "fa fa-credit-card",isActive:false, url: "/ucenter/users/finance/detailed"},
                              { name: "在线充值",enname: "userlist",ico: "fa fa-credit-card",isActive:false, url: "/ucenter/users/finance/recharge"}, 
                              { name: "发票管理",enname: "userlist",ico: "fa fa-credit-card",isActive:false, url: "/useredit/users"}, 
                              { name: "优惠券管理",enname: "userlist",ico: "fa fa-credit-card",isActive:false, url: "/useredit/users"}, 
                              { name: "促销包管理",enname: "userlist",ico: "fa fa-credit-card",isActive:false, url: "/useredit/users"}
                          ]
                      }, 
                      {
                          name: "订单管理",enname: "userlist",ico: "",isActive:false, url: "/ucenter/users/order/list",children: [ ]
                      }, 
                      {
                          name: "代理平台设置",enname: "agency",ico: "",isActive:false, url: "/ucenter/users/agency",children: [
                              { name: "信息设置",enname: "userlist",ico: "fa fa-gg-circle",isActive:false, url: "/ucenter/agency/setting"}, 
                              { name: "平台设置",enname: "userlist",ico: "fa fa-gg-circle",isActive:false, url: "/ucenter/agency/terrace"}, 
                              { name: "新闻管理",enname: "userlist",ico: "fa fa-gg-circle",isActive:false, url: "/ucenter/agency/news"}, 
                              { name: "基本信息",enname: "userlist",ico: "fa fa-gg-circle",isActive:false, url: "/ucenter/agency/basic"}
                          ]
                      }, 
                      {
                          name: "有问必答",enname: "userlist",ico: "",isActive:false, url: "",children: [
                              { name: "尚未解决",enname: "userlist",ico: "",isActive:false, url: "/users"}, 
                              { name: "所有问题",enname: "userlist",ico: "",isActive:false, url: "/users"}, 
                              { name: "新闻管理",enname: "userlist",ico: "",isActive:false, url: "/users"}, 
                              { name: "已经回复",enname: "userlist",ico: "",isActive:false, url: "/users"}
                          ]
                      }]
                  },
                  // 测试页面start
                  {
                      name: "产品中心",enname: "usermange",ico: "fa fa-diamond",isActive:true, url: "",root: false,children: [
                          { name: "虚机管理",enname: "usermange",ico: "fa fa-cubes",isActive:false, url: "",root: false,children: []}, 
                          { name: "云端建站",enname: "usermange",ico: "fa fa-cloud",isActive:false, url: "",root: false,children: []}, 
                          { name: "百度云管理",enname: "usermange",ico: "fa fa-cloud-upload",isActive:false, url: "",root: false,children: []}, 
                          { name: "服务器管理",enname: "usermange",ico: "fa fa-server",isActive:false, url: "",root: false,children: []},
                          { name: "邮局管理",enname: "usermange",ico: "fa fa-envelope",isActive:false, url: "",root: false,children: []}, 
                          { name: "微舟管理",enname: "usermange",ico: "fa fa-ship",isActive:false, url: "",root: false,children: []},
                      ]
                  },
                  { name: "代理管理", enname: "usermange",ico: "fa fa-tachometer",isActive:false, url: "",root: false,children: [] }, 
                  { name: "代理产品",enname: "usermange",ico: "fa fa-tasks",isActive:false, url: "",root: false, children: []}, 
                  { name: "代理财务",enname: "usermange",ico: "fa fa-cc-visa",isActive:false, url: "",root: false,children: []}, 
                  { name: "代理用户",enname: "usermange",ico: "fa fa-gears",isActive:false, url: "",root: false,children: []}, 
                  { name: "客服中心",enname: "usermange",ico: "fa fa-umbrella",isActive:false, url: "",root: false,children: []}, 
                  { name: "业务管理",enname: "usermange",ico: "fa fa-mortar-board",isActive:false, url: "",root: false,children: [] }
                  // 测试页面end
              ]
      }
    },

	  components:{
      "sideBar":sideBar,
       subMenu:_subMenu
    },
    methods:{
    
      /**
        * 激活菜单Actice
        * @param  {[type]} val [description]
      */
     activeSideMenu(val){
       this.menus.map((it)=>{
         if(this.accordion){
            it.isActive = it.name == val 
         }else {
            if(!it.isActive){ // 不影响原来的状态
               console.log("it.name",it.name);
               it.isActive = it.name==val;
            }
          }
       })
     },
     /**
      * 菜单一级栏点击响应事件
      * @param  {[type]} event   [菜单一级栏Dom对象]
      * @param  {[type]} curnode [菜单一级栏Dom对应数据]
      * @return {[type]}         [description]
      */
     busMenuLiClick(event,curnode){
          // 本地存储
         if(typeof curnode == "string"){ // 点击一级菜单
     
         }else{ // 点击二级菜单
            if( curnode["children"] && curnode["children"].length != 0){
                let args = curnode;
                 this.$router.push(args["children"][0].url); // 调出子菜单的第一个链接路由
                 this.ROUTE_SUBMENU_SET({ routeurl:args["url"],submenu:args["children"]}); // 路由子菜单存储
                  Bus.$emit("changeMainPageMargin",this.status[2]);
                 //this.$emit("miniSubMenu",this.status[2]);
                 //this.secondActive = args.name;
             }else{
                this.ROUTE_SUBMENU_SET({ routeurl:curnode.url,submenu:null}); // 路由子菜单存储
                if(curnode.iframe){
                    this.$router.push({ path : curnode.url,query : {url:curnode.iframe}});
                }else{
                    this.$router.push(curnode.url); 
                }
                Bus.$emit("changeMainPageMargin",this.status[0]);
                //this.secondActive = curnode.name;
                //this.$emit("miniSubMenu",curnode.iframe?this.status[3]:this.status[0]);
            }
        }
     },
      /**
      * 菜单二级栏右击响应事件[保存该路由路径的子栏数据]
      * @param  {[type]} event   [菜单二级栏右击Dom对象]
      * @param  {[type]} curnode [菜单二级栏右击Dom对应数据]
      * @return {[type]}         [description]
      */
     busRightClick(val){
         this.ROUTE_SUBMENU_SET(val);
     },
     // 本地存储
      ...mapActions([
          "ROUTE_SUBMENU_SET",
          "SYS_SUBMENU_CLEAR"
      ])
    },
    watch:{
      subMenuStatus(val,oldval){
         this.$emit("changeMainPageMargin",val);
      } 
    },
    computed : {
       getRoutesSubMenu(){
             let routesPath  = this.$route.path.split("/");
             let routesUrl   = routesPath.slice(0,-1);                  
             let vuexSate    = this.$store.state.submenu; // or var reg = /(.+?)(?:\/[^\/]*){2}$/;  or Array.length-2
             let splitLength = routesPath.length <=4 ? -1:-2; // 是否有BUG
             let rootPath    = routesPath.slice(0,splitLength).join("/");
             console.log("rootPath",rootPath)
             this.menus.map((item)=>{
                 if( rootPath == item.url){
                     this.activeSideMenu(item.name)
                 }
             })
             if(vuexSate && vuexSate.routeSubmenu && vuexSate.routeSubmenu[routesUrl.join("/")]){
                   Bus.$emit("changeMainPageMargin",this.status[2]);
                   return  vuexSate.routeSubmenu[routesUrl.join("/")]
             }else{
                Bus.$emit("changeMainPageMargin",this.status[0]);
             }
             return null
       }
    },
    created(){
        Bus.$on("busMenuLiClick",(el,node)=>{
             this.busMenuLiClick(el,node);
        });
        Bus.$on("busRightClick",(val)=>{
             this.busRightClick(val);
        });
    },
    mounted(){

    }
      
  }
</script>
<style scoped>
    .minisub #sidemenu{
         width:50px;
         color:red;
    }
</style>