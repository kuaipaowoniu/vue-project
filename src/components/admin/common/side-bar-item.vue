<template>
      <li style="postion:relative" :class="{active:isActive}" @click="handlerClick($event,data.name)">
            <a href="#" class="topsub" > 
                <i :class="data.ico"></i>
                <span class="nav-label">{{ data.name }}</span>
                <span class="fa fa-angle-double-down" v-if="!!data.children"></span>
            </a>
            <ul class="nav submenu nav-second-level" v-if="!!data.children" ref="contentWrap">
               <li v-for="secondmenu in data.children" @mousedown="rightClickItem($event,secondmenu)">
                    <a href="#" class="J_menuItem" @click.stop="handlerClick($event,secondmenu)"> {{secondmenu.name}}</a>
               </li>  
            </ul>
     </li>
</template>
<script>

  import Bus from "../../../utils/bus";

  export default{
    data(){
      return {}   
    },
    props:["data","name","status"],
 
    computed: {
      isActive() {
        return this.$parent.activeNames.indexOf(this.name) > -1;
      },
      isExpand() {
        return this.$parent.isExpand?true:false;
      }
    },
    watch: {
      // 菜单一级栏是否激活
      "isActive"(value) {
        value ? this.handlerOpen() : this.handlerClose();
      },
      // 菜单是否展开
      "isExpand"(value,oldVal){
        if(this.isActive){
          value ? this.handlerOpen():this.handlerClose();//this.handlerOpen() : this.handlerClose();
        }
      }
    },
    methods:{
      // 点击一级栏
      handlerClick(event,curnode){
        if(typeof curnode == "string"){ // 点击一级菜单
           this.$emit("handleItemClick",curnode);
        }
        Bus.$emit("busMenuLiClick",event,curnode);
        this.$nextTick();

      },
      /**
       * 右键菜单
       * @param  {[type]} event [description]
       * @return {[type]}       [description]
       */
      rightClickItem(event,node){
           let e = event || window.event;
           this.node = node;
           //右键
           if(e.which==3){
               // 提交给父组件处理 
               Bus.$emit("cxtRightClick",e,node);
           } 
      },
      
      // 打开子菜单
      handlerOpen(){
        const contentWrapElm = this.$refs.contentWrap;
        const contentHeight = this.contentHeight;

        contentWrapElm.style.display = 'block';
        contentWrapElm.style.height = '0';

        setTimeout(_ => {
          contentWrapElm.style.height = contentHeight + 'px';
        }, 10);
      },
      // 关闭子菜单
      handlerClose(){
          const contentWrapElm = this.$refs.contentWrap;
          const contentHeight = contentWrapElm.offsetHeight;
          setTimeout(_ => {
            contentWrapElm.style.height = '0';
          }, 10);
      },
      /**
       * 数据初始化
       * @return {[type]} [description]
       */
      init(){
        if (!this.isActive) {
          let contentWrapElm = this.$refs.contentWrap;
          this.contentHeight = this.$refs.contentWrap.offsetHeight;
          contentWrapElm.style.height = '0';
          contentWrapElm.style.display = 'none';
        }
      }
    },
   
    mounted(){
      this.init();
        //console.log(this.name);
    },
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