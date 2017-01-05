<template>
  <div id="wrapper"  :class="{'nosub':sidebarStatus=='nosub','minimenu':sidebarStatus=='minimenu','normalsub':(sidebarStatus=='normalsub' || sidebarStatus==''),iframe:sidebarStatus=='iframe'}">
        <!--左侧栏-->
       <!--  <mt-sidebar v-if="isLogined"  @changeMainPageMargin="changeMainPageMargin"></mt-sidebar> -->
        <side-bar-third v-if="isLogined"></side-bar-third>
        <!--右侧栏-->
        <div :id="attrid" class="white-bg dashbard-1" >
            <!--顶栏-->
            <mt-header v-if="isLogined"></mt-header>
            <!--路由版块-->
            <transition name="slide">
                <router-view></router-view>
           </transition>
        </div>
       <!--  <loading-mask></loading-mask> -->
  </div>
</template>

<script>
  import Bus from "../../utils/bus";
  import sidebar from "./common/sidebar";
  import header from "./common/header";
  import loading from "../common/loading";
  import sideBarThird from "./common/side-bar-third";
  export default {
    name: "wrapper",
    //mixins: [mixins],
    data(){
      return {
         sidebarStatus:"",
         isLogined:!!this.$store.state.currentUser.userid,
         attrid:!!this.$store.state.currentUser.userid?"page-wrapper":"page-login",
        
      }
    },
    components: {
      // "mt-sidebar":sidebar,
      "sideBarThird":sideBarThird,
      "mt-header":header,
      "loading-mask":loading
    },
    beforeCreate(){
       $("body").addClass("fixed-sidebar full-height-layout fixed-nav").attr("style","overflow:hidden");
    },
    methods:{
      // 供子组件
      changeMainPageMargin(val){
         this.sidebarStatus = val;
      }
    },
    created(){
        Bus.$on("changeMainPageMargin",val=>{
            this.sidebarStatus = val;
        });
    },
    mounted(){
      //$("#side-menu").metisMenu();
       // console.log("用户编号:",this.$store.state.currentUser.userid);
    }
  }
</script>
