// 引入VUE
import Vue from "vue";
// 引入VUE 路由
import VueRouter from "vue-router";
// 一个插件，为用 XMLHttpRequest 或 JSONP 生成网络请求、响应提供服务
import VueResource from "vue-resource";
// element-ui
import ElementUI from "element-ui";
// 引入storejs
import Store from "storejs";
// 引入全局Vuex store
import store from "./vuex/";
// 助手类
import utils from "./utils/utils";
// 错误定义类
import errors from "./utils/errors";
// MD5
import md5 from "./utils/md5";
// 路由配置表
import routes from "./config/routes.config";
// 身份校验
import auth from "./auth";


//Vue.config.debug = true
//const install = function(Vue) {
//if (install.installed) return;
// 装载到前局
Vue.prototype.$utils = utils;
Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(VueRouter);

// 如果Web服务器无法处理编码为application/json的请求，你可以启用emulateJSON选项。启用该选项后，请求会以application/x-www-form-urlencoded作为MIME type，就像普通的HTML表单一样
Vue.http.options.emulateJSON = true;

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  //hashbang: true,
  mode: "history",
  store,
  routes // （缩写）相当于 routes: routes
});
//拦截器
Vue.http.interceptors.push(function(request, next) {
  //Add JWT to all requests
  request.headers.set("authorization", "YYYYYYY888888888");
  //console.log("存储器====>", store.state.apiToken);
  request.headers.set("accesstoken", store.state.apiToken);
  //Skip storing token refresh requests
  next(function(response) {
    auth.checkApiToken(response, request).then((response) => {
      // 业务失败统一处理,过滤后进入组件的都是成功且可处理的数据状态
      if (response && response.data && response.data.status != 1) {
        let message = errors[response.data.status] ? errors[response.data.status] : errors["19999"];
        window.vueApp.$alert(`${message},错误详情:\r\n${response.data.info}`, "错误提示", {
          callback: action => {
            // 回调待处理
          }
        });
      }
      return response;
    });
  }.bind(this));
}.bind(this));



//登录中间验证
router.beforeEach((to, from, next) => {
  console.log(to);
  let isLogin = Boolean(store.state.currentUser.userid); //true用户已登录， false用户未登录
  if (to.meta.auth && to.path !== "/ucenter/login" && !isLogin) {
    return next({
      path: "/ucenter/login"
    });
  }
  next();
});


const App = require("./components/app.vue");
// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
window.vueApp = new Vue({
  router,
  store,
  //mixins: [mixins],
  render: h => h(App) // 渲染
}).$mount("#app"); // $mount挂载