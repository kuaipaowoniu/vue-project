<template>
  <div id="home" style="min-height:900px;">

          <h2>欢迎来到MINETWORK{{count}}--{{name}}</h2>
          <button @click="updateTest">提交</button>
          <button @click="submitHandler">组件提交</button>
  </div>
</template>

<script>
    import { mapGetters,mapActions  } from "vuex";
	export default {
		 name: "home",
		 data(){
		  	return {
		  		name:this.$store.state.test
		  	}
		 },
		 mounted(){ 
 
		 },
		 computed: {
		    count () {
		       return this.$store.state.test
		    }
		 },
		 methods:{
		  submitHandler(){
		  	this.$store.commit({type:"updateTest",step:1})
		  },
		  ...mapActions([
            "updateTest"  
        ]),
		}
	}
</script>
<style>

</style>
