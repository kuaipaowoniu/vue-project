/**
 *  混入器mixins
 *  功能范围：routes-loading
 */
export default {
	data() {
			return {
				isShowingStatus: false,
				loadingObject:null
			}
		},
		created() {
			// 打开loading效果动画
			this.isShowingStatus = true;
		},
		mounted() {
		},
		watch: {
			isShowingStatus(newVal, oldVal) {
				if (newVal) {
					this.loadingObject = this.$loading({
						text: "正在处理中........"
					});
				}else{
					console.log(!!this.loadingObject);
                  if(!!this.loadingObject && !newVal){
                  	  this.loadingObject.close();
                  }
				}
			}
		}
}