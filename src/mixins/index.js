/**
 *  混入器mixins
 *  功能范围：routes-loading
 */
import Vue from "vue";

export default {
	data() {
			return {
				isShowingStatus: false,
				loadingObject: null,
				tempinstance:null,
			}
		},
		created() {
			// 打开loading效果动画
			//this.isShowingStatus = true;

			let LoadingConstructor = Vue.extend(require("../components/common/loading.vue"));
			    LoadingConstructor.prototype.close = function(){
                    this.isshow = false;
			    };
			let instance = new LoadingConstructor({
				data: {
					//message: "你好",
					isshow:true
				}
			});
			instance.id = "18888";
			instance.vm = instance.$mount();
			document.body.appendChild(instance.vm.$el);
			this.tempinstance = instance;

            // 有以下几种挂载方式
			// var MyComponent = Vue.extend({
			//   template: '<div>Hello!</div>'
			// })
			// // 创建并挂载到 #app (会替换 #app)
			// new MyComponent().$mount('#app')
			// // 同上
			// new MyComponent({ el: '#app' })
			// // 或者，在文档之外渲染并且随后挂载
			// var component = new MyComponent().$mount()
			// document.getElementById('app').appendChild(component.$el)
		},
		mounted() {},
		watch: {
			isShowingStatus(newVal, oldVal) {
				if (newVal) {
					this.loadingObject = this.$loading({
						text: "正在处理中........"
					});
				} else {
					console.log(!!this.loadingObject);
					if (!!this.loadingObject && !newVal) {
						this.loadingObject.close();
					}
				}
			}
		}
}