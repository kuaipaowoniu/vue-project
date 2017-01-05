<template>
    <div class="_context-menu">
        <ul>
            <li v-for="item in data" @click="clickItem(item)"><i :class="item.icon"></i>{{item.text}}</li>
        </ul>
    </div>
</template>

<script>
    export default{
        name:"cp-contextmenu",
        props:["data"],
        methods:{
            clickItem:function (item) {
                if(item.callBack){
                    item.callBack(this);
                }
            }
        }
    }
</script>
<style scoped>

  ._context-menu{
     position: fixed;
     z-index:9999;
     background:#324057;
     width:100px;
     transition: 0.5s;
  }
  ._context-menu ul,._context-menu ul li{
     margin:0px;
     padding:0px;
     list-style: none;
  }
  ._context-menu ul li{
     cursor: default;
     color:#fff;
     padding: 10px;
     font-size: 12px;
     border-bottom:1px solid #475669;
  }
  ._context-menu ul li i{
     margin-right: 5px;
  }
  ._context-menu ul li:hover{
     background:#475669;
     color:#fff;
  }
</style>