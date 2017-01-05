import Vue from 'vue'
import * as types from "../mutation.type";
// 引入storejs
import Store from "storejs";

export default {
    state:{
       submenu:Store.get(types.SYS_SUBMENU_GET) || null,  
    },
    mutations: {
        [types.SYS_SUBMENU_SET](state, subdata) {
            // 单节点
             let _local = state.submenu;
            if(typeof subdata == "string"){
                if(_local["name"] != subdata){
                    _local["name"] = subdata;
                    state.submenu  = _local;
                    Store.set(types.SYS_SUBMENU_GET, _local); 
                }
            }
            // 多节点
            if(typeof subdata == "object"){
                if(!(_local)){
                    _local = { "children": subdata }
                }else{
                    _local["children"] = subdata;
                }
                state.submenu = _local;
                Store.set(types.SYS_SUBMENU_GET, _local); 
            }
        },
        [types.SYS_SUBMENU_CLEAR](state) {
            let _local = state.submenu;
                _local["children"] = null;
                Store.set(types.SYS_SUBMENU_GET, _local); 
        } 
    },
    actions: {
        // 侧边栏存储，防止F5刷新页面
        [types.SYS_SUBMENU_SET]({commit},subdata) {
            commit(types.SYS_SUBMENU_SET, subdata);
        },
        // 侧边栏存储清除
        [types.SYS_SUBMENU_CLEAR]({commit}) {
            commit(types.SYS_SUBMENU_CLEAR);
        }  
    }
}