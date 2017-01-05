<template>
    <transition  :name="transitionName">
       <router-view></router-view>
    </transition>
</template>
<script>
    export default{
         data () {
		    return {
		      transitionName: 'slide-left'
		    }
		  },
		  // dynamically set transition based on route change
		  watch: {
		    "$route"(to,from) {
		    	 console.log("路由动效");
		      const toDepth = to.path.split('/').length
		      const fromDepth = from.path.split('/').length
		      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
		    }
		  },
    }
</script>
<style>
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s ease;
	}
	.fade-enter, .fade-leave-active {
	  opacity: 0
	}
	.slide-left-enter, .slide-right-leave-active {
	  opacity: 0;
	  -webkit-transform: translate(30px, 0);
	  transform: translate(30px, 0);
	}
	.slide-left-leave-active, .slide-right-enter {
	  opacity: 0;
	  -webkit-transform: translate(-30px, 0);
	  transform: translate(-30px, 0);
	}
</style>
