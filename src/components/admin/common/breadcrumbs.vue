<template>
    <div id="breadcrumbs" class="col-sm-12 border-bottom clear">
       <div class="page-heading">
                <ol class="breadcrumb">
                    <li>
                        <a href="index.html"><i class="fa fa-home"></i>  管理中心</a>
                    </li>
                    <li v-for="link in links">
                       {{link}}
                    </li>

                    <li>
                        <strong>包屑导航</strong>
                    </li>
                </ol>
            </div>
        </div>
</template>
<script>
    import { mapGetters  } from "vuex";
	export default{
		name:"navigation",
        props:{
          links:{
            type:Array,
            validator:o=>{
               return Object.prototype.toString.call(o)==="[object Array]"?o:null;
            }

          }
        },
        computed: {
            ...mapGetters([
              "langs"
            ])
        }
	}
</script>