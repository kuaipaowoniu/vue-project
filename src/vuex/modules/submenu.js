import Vue from 'vue'
import * as types from "../mutation.type";
// 引入storejs
import Store from "storejs";

export default {
    state:{
       //submenu:Store.get(types.SYS_SUBMENU_GET) || null,
       routeMain:Store.get(types.ROUTE_SUBMENU_MAIN_GET) || "",
       routeSubmenu:Store.get(types.ROUTE_SUBMENU_GET) || {}
    },
    mutations: {
        /**
          * 根据路由路径来存储侧边栏数据，应对新开/F5刷新页面
          * 参数{ routeurl,submenu}
          */
        [types.ROUTE_SUBMENU_SET](state, params) {
           let _routemenu = state.routeSubmenu; 
          // if( typeof _routemenu[params.routeurl] == "undefined"){ 
               _routemenu[params.routeurl] =  params.submenu;
                state.routeSubmenu = _routemenu;
                Store.set(types.ROUTE_SUBMENU_GET, _routemenu); 
           //}
        },
         /**
          * 定位一级菜单栏激活状态
          * 参数{ routeurl,submenu}
          */
        [types.ROUTE_SUBMENU_MAIN_GET](state, main) {
           let _routemenu = state.routeSubmenu; 
          // if( typeof _routemenu[params.routeurl] == "undefined"){ 
               _routemenu[params.routeurl] =  params.submenu;
                state.routeSubmenu = _routemenu;
                Store.set(types.ROUTE_SUBMENU_GET, _routemenu); 
           //}
        },
        // [types.SYS_SUBMENU_SET](state, subdata) {
        //     // 单节点
        //      let _local = state.submenu;
        //     if(typeof subdata == "string"){
        //         if(_local["name"] != subdata){
        //             _local["name"] = subdata;
        //             state.submenu  = _local;
        //             Store.set(types.SYS_SUBMENU_GET, _local); 
        //         }
        //     }
        //     // 多节点
        //     if(typeof subdata == "object"){
        //         if(!(_local)){
        //             _local = { "children": subdata }
        //         }else{
        //             _local["children"] = subdata;
        //         }
        //         state.submenu = _local;
        //         Store.set(types.SYS_SUBMENU_GET, _local); 
        //     }
        // },
        [types.SYS_SUBMENU_CLEAR](state) {
            let _local = state.submenu;
                _local["children"] = null;
                Store.set(types.SYS_SUBMENU_GET, _local); 
        } 
    },
    actions: {
          /**
          * 根据路由路径来存储侧边栏数据，应对新开/F5刷新页面
          * 参数{ routeurl,submenu}
          */
        [types.ROUTE_SUBMENU_SET]({commit},params) {
            //console.log("路由菜单存储");
            commit(types.ROUTE_SUBMENU_SET, params);
        },
        // 侧边栏存储，防止F5刷新页面
        // [types.SYS_SUBMENU_SET]({commit},subdata) {
        //     commit(types.SYS_SUBMENU_SET, subdata);
        // },
        // 侧边栏存储清除
        [types.SYS_SUBMENU_CLEAR]({commit}) {
            commit(types.SYS_SUBMENU_CLEAR);
        }  
    }
}