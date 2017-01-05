// 引入VUE
import Vue from "vue";
// 引入VUEX
import Vuex from "vuex";

import submenu from './modules/submenu';

// 引入storejs
import Store from "storejs";

Vue.use(Vuex);

// 索引KEY
const [AUTHORIZATION, PARAMSMAP, APITOKEN, CURRENTLAN] = ["AccessToken", "Params", "Minetwork", "CurrentLan"];

// 全局状态管理
const state = {
	currentLan: Store.get(CURRENTLAN) || "en", // 当前的语言库
	currentUser: JSON.parse(sessionStorage.getItem(AUTHORIZATION)) || {}, // 当前的用户信息
	apiToken: Store.get(APITOKEN) || "", // 接口调用口令密钥
	paramsPool: Store.get(PARAMSMAP) || {}, // 参数池
};


const getters = {
  /**
   * [langs 语言库获取]
   * @return {[type]} [description]
   */
  GETLANGS: function() {
    Langs = require("../assets/language/"+state.currentLan+"/language");
    return Langs;
  },
   /**
   * [getUser 获取当前用户信息]
   * @return {[type]} [description]
   */
  getUser: function() {
    return state.currentUser;
  },
  /**
   * [getParamsPool 获取当前Select参数列表]
   * @return {[type]} [description]
   */
  getParamsPool: function() {
    return state.paramsPool;
  }
};
const mutations = {
  /**
   * 语言库切换
   * @param  {[type]} state [description]
   * @param  {[type]} which [description]
   * @return {[type]}       [description]
   */
  CHANGELAN(state, which) {
    Store.set(CURRENTLAN, which); 
    //state.currentLan = which;
  },
  /**
   * 跨组件共享全局参数
   * @param {[type]} state  [description]
   * @param {[type]} params [description]
   */
  PARAMSPOOL(state, params) {

    Store.set(PARAMSMAP, params); 
    state.paramsPool = params;

  },
  /**
   * 清除ApiToken接口令牌
   * @param {[type]} state [description]
   */
  CLEARAPITOKEN(state){
  	 Store.remove(APITOKEN);
  },
  /**
   * 清除共享全局参数
   * @param {[type]} state  [description]
   * @param {[type]} params [description]
   */
  CLEARPARAMSPOOL(state) {
    //sessionStorage.removeItem(AUTHORIZATION)
    //Object.keys(state).forEach(k => Vue.delete(state, k))
    console.log("清除共享全局参数");
    Store.remove(PARAMSMAP);
  },
  /**
   * 登录成功
   * @param {Object} state
   * @param {Object} user
   */
  SIGNIN(state, user) {
    sessionStorage.setItem(AUTHORIZATION, JSON.stringify(user));
    Object.assign(state, user);
  },
  /**
   * 退出登录
   * @param {Object} state
   */
  SIGNOUT(state) {
    sessionStorage.removeItem(AUTHORIZATION)
    Object.keys(state).forEach(k => Vue.delete(state, k))
  },
  updateTest(state,step){
    //state.test = step.step;
    setTimeout(function(){
        state.test++;
    },1000)
  }
};

const actions = {
  // 语言切换
  CHANGELAN({  commit }, which) {
    commit("CHANGELAN", which)
  },
  // 设置共享全局参数
  SETPARAMSPOOL({ commit  }, params) {
    commit("PARAMSPOOL", params);
    //Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
  },
  // 清除共享全局参数
  CLEARPARAMSPOOL({ commit }) {
    commit("CLEARPARAMSPOOL");
  },
   // 清除ApiToken接口令牌
  CLEARAPITOKEN({ commit }) {
    commit("CLEARAPITOKEN");
  },
  // 变更用户状态
  SIGNIN({ commit }, user) {
    commit("SIGNIN", user)
  },
  SIGNOUT({  commit }) {
    commit("SIGNOUT")
  }



};

export default new Vuex.Store({
	strict: true, //使用严格模式
	modules: {
		submenu
	},
	state:state,
	getters:getters,
	actions:actions,
	mutations:mutations
})