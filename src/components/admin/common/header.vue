<template>
  <div id="header">
        <nav class="navbar navbar-fixed-top" role="navigation" style="margin-bottom: 0">
                    <div class="navbar-header">
                        <a href="javascript:;" class="logo"><img alt="image" width="100" height="50"  src="/resources/img/logo.png"></a>
                        <span class="logotext nav-label">域名交易管理系统平台</span>
                    </div>
                    <ul class="nav navbar-top-links navbar-right">
                       <li class="welcome" v-html="welcome">
                         
                        </li>
                        <li class="dropdown">
                             <a href="#"  data-toggle="dropdown"  class="dropdown-toggle count-info" data-index="0"><span class="cmmradius"><i class="fa fa-tasks"></i></span>语言设置<i class="caret"></i></a>
                             <ul class="dropdown-menu animated fadeInRight lanuange">
                                <li @click="CHANGELAN('cn')">
                                    <a href="javascript:;"><i class="fa fa-angle-right"></i>中文</a>
                                </li>
                                 <li @click="CHANGELAN('en')">
                                    <a href="javascript:;"><i class="fa fa-angle-right"></i>英文</a>
                                </li>
                               
                            </ul>
                        </li>
                        <li class="dropdown hidden-xs">
                            <a class="right-sidebar-toggle" @click="setSysTheme" aria-expanded="false">
                                <span class="cmmradius"><i class="fa fa-th-large"></i></span>主题设置<i class="caret"></i>
                            </a>
                        </li>
                        <li class="dropdown">
                             <a href="#"  data-toggle="dropdown"  class="dropdown-toggle count-info" data-index="0"><span class="cmmradius"><i class="resize fa fa-user"></i></span>我的帐号<i class="caret"></i></a>
                             <ul class="dropdown-menu animated fadeInRight">
                                <li @click="CHANGELAN('cn')">
                                    <a href="javascript:;"><i class="fa fa-pencil m-r-xs"></i>修改密码</a>
                                </li>
                                <li @click="loginout">
                                    <a href="javascript:;"><i class="fa fa-power-off m-r-xs"></i>退出系统</a>
                                </li>
                               
                            </ul>
                        </li>
                    </ul>
                </nav>

                <!--右侧边栏开始-->
        <div id="right-sidebar">
            <div class="sidebar-container">

                <ul class="nav nav-tabs navs-3">

                    <li class="active">
                        <a data-toggle="tab" href="#tab-1">
                            <i class="fa fa-gear"></i> 主题
                        </a>
                    </li>
                    <li class=""><a data-toggle="tab" href="#tab-2">
                        通知
                    </a>
                    </li>
                    <li><a data-toggle="tab" href="#tab-3">
                        项目进度
                    </a>
                    </li>
                </ul>

                <div class="tab-content">
                    <div id="tab-1" class="tab-pane active">
                        <div class="sidebar-title">
                            <h3> <i class="fa fa-comments-o"></i> 主题设置</h3>
                            <small><i class="fa fa-tim"></i> 你可以从这里选择和预览主题的布局和样式，这些设置会被保存在本地，下次打开的时候会直接应用这些设置。</small>
                        </div>
                        <div class="skin-setttings">
                            <div class="title">主题设置</div>
                            <div class="setings-item">
                                <span>收起左侧菜单</span>
                                <div class="switch">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="collapsemenu" class="onoffswitch-checkbox" id="collapsemenu">
                                        <label class="onoffswitch-label" for="collapsemenu">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="setings-item">
                                <span>固定顶部</span>

                                <div class="switch">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="fixednavbar" class="onoffswitch-checkbox" id="fixednavbar">
                                        <label class="onoffswitch-label" for="fixednavbar">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="setings-item">
                                <span>
                        固定宽度
                    </span>

                                <div class="switch">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="boxedlayout" class="onoffswitch-checkbox" id="boxedlayout">
                                        <label class="onoffswitch-label" for="boxedlayout">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="title">皮肤选择</div>
                            <div class="setings-item default-skin nb">
                                <span class="skin-name ">
                         <a href="#" class="s-skin-0">
                             默认皮肤
                         </a>
                    </span>
                            </div>
                            <div class="setings-item blue-skin nb">
                                <span class="skin-name ">
                        <a href="#" class="s-skin-1">
                            蓝色主题
                        </a>
                    </span>
                            </div>
                            <div class="setings-item yellow-skin nb">
                                <span class="skin-name ">
                        <a href="#" class="s-skin-3">
                            黄色/紫色主题
                        </a>
                    </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--右侧边栏结束-->
  </div>
</template>
<script>
    import { mapStates,mapActions,mapGetters  } from "vuex";
    export default{
        name:"header",
        data(){
          return { }
        },
        computed: {
            welcome(){
              return "您好，<strong>"+this.$store.state.currentUser.username+"</strong>，欢迎登录！ "+this.$utils.DateFormate();
            },
            ...mapGetters([
              "GETLANGS",
              "getUser"
            ])
        },

        methods:{
          loginout(){
              this.SIGNOUT(); // 退出系统，清除本地存储用户信息
              this.CLEARPARAMSPOOL();// 清除全局应用参数
              this.CLEARAPITOKEN(); // 清除ApiToken接口令牌
              window.location.href = "/ucenter/login";
          },
          setSysTheme(){
               $("#right-sidebar").toggleClass("sidebar-open");
          },
          ...mapActions([
              "CHANGELAN",
              "CLEARAPITOKEN",
              "CLEARPARAMSPOOL",
              "SIGNOUT" 
            ]),

        }
    }
</script>

<style scoped>
    .navbar-right a {
        position: relative;
        padding:0px 5px 0px 25px;
    }
    .navbar-right a span{
         display: inline-block;
         color:#fff;
    }
    .nav.navbar-right > li > a:hover .cmmradius{
        background: #1ab394;
        transition: 0.5s;
        transform: rotate(360deg);
    }
    .nav.navbar-right > li > a:hover .cmmradius i{
        color:#fff;
    }

   .cmmradius{
        background: #fff none repeat scroll 0 0;
        border-radius: 50%;
        color: #fff;
        position: absolute;
        top:25px;
        left:0px;
        height: 20px;
        text-align: center;
        width: 20px;
        margin-right:3px; 
   }
   .cmmradius i{
      color:#666;
      position:absolute;
      margin-left:0px;
      top:5px;
      left:5px;
      font-size:12px;
   }
   .navbar-right{
     right:-20px;
   }
</style>
