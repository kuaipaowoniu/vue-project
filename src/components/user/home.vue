<template>
  <div id="wrapper">
      <mt-header></mt-header>
      <div class="zrapper"><router-view></router-view></div>
      <mt-footer></mt-footer>
  </div>
</template>

<script>

  import header from "./common/header";
  import footer from "./common/footer";
  export default {
    name: "wrapper",
    data(){
      return {
 
      }
    },
    components: {
      "mt-header":header,
      "mt-footer":footer
    },
    mounted(){ 
        
    },
    computed: {
     
    } 
  }
</script>
<style>
   .zrapper { width:1200px;margin:0 auto; position: relative;}
</style>
