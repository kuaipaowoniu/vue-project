<template>
     <!--三级导航开始-->
     <ul class="nav">
         <li v-for="(menu,index) in menus">
             <router-link class="menuItem" :to="menu.url">
                    <i :class="menu.ico"></i>
                    <span  v-if="!isMiniSub"  class="sub-label">{{ menu.name }}</span>
             </router-link>
         </li>
         <li @click.stop="stretch">
            <a class="menuItem"><i :class="{fa:true,'fa-sign-in':!isMiniSub,'fa-sign-out':isMiniSub} "></i><span v-if="!isMiniSub" class="sub-label">关闭打开</span></a>
         </li>
     </ul>
</template>
<script>
    import { mapGetters  } from "vuex";
    import Bus from "../../../utils/bus";
	export default{
		name:"sub-menu-component",
        props:["menus","status"],
        data(){
            return {
               isMiniSub:false
            }
        },
        methods:{
            stretch(){
                this.isMiniSub = !this.isMiniSub;
                Bus.$emit("changeMainPageMargin",this.isMiniSub?this.status[1]:this.status[2]);
                //this.$emit("miniSubMenu",this.isMiniSub?this.status[1]:this.status[2]);//this.isMiniSub?1:2
            }
        }
	}
</script>
<style scoped>
    .menuItem{
         color:#666;
         font-size: 12px;
         padding:14px 14px;
         border-bottom:solid 1px #e8e8e8;
    }
    .router-link-active,.router-link-active:hover,.router-link-active:active{
       background:#1ab394;
       color:#fff; 
    }
</style>