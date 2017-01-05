<template>
    <div class="main">
	    <transition :name="transitionName">
	       <router-view  class="child-view"></router-view>
	    </transition>
    </div>
</template>
<script>
    export default{
         data () {
		    return {
		      transitionName: "slide-left"
		    }
		  },
		  watch: {
		    "$route"(to,from) {
		       this.transitionName = ["slide-right","slide-left"][parseInt(2*Math.random())];
		    }
		  },
    }
</script>
<style scoped>
	.fade-enter-active, .fade-leave-active {
	    transition: opacity .5s ease;
	}
	.fade-enter, .fade-leave-active {
	    opacity: 0
	}
	.child-view {
	    position: absolute;
	    width:100%;
	    transition: all .5s cubic-bezier(.55,0,.1,1);
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

