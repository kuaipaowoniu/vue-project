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
  

            <side-bar :data="menus" :accordion="true" :cxtMenu="false">
              
              
            </side-bar>
         </div>
    </div>
</template>

<script>
  import sideBar from "../../common/side-bar";
	export default {
	  name:"",
    components:{
      "sideBar":sideBar
    },
    data(){
            return {
               menus : [

                       {
                            name: "系统主页",enname: "sysmain", ico: "fa fa-home",isActive:true, url: "/ucenter/main",children: [
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
	}
</script>
<style>

</style>
