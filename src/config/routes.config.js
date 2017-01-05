// 寻组件封装
const getComponent = name => {
	return resolve => {
		require([`../components/${name}.vue`], resolve)
	}
};
export default [
       // 供外网路由
       { 
       		name: "index",path: "/index",component: getComponent("user/home"),children: [
       		    // 默认页
			   	{ name: "welcome",path: "welcome",meta: { auth: false }, component: getComponent("user/page/welcome") }, 
			   	// 注册页
			   	{ name: "register", path: "register", meta: { auth: false }, component: getComponent("user/page/user/register") }
			]
	   }, 
	   // 供内网路由
	   { 
	   		name: "ucenter",path: "/ucenter",component: getComponent("admin/main"),children: [
			     // 登录页
		     	 { name: "login",path: "login", meta: { auth: false }, component: getComponent("admin/login")},
		     	 // 默认主题
		     	 { name: "home", path: "home", meta: { auth: true }, component: getComponent("admin/page/welcome")},
		     	 // 默认分类模块
		    	 { 
		    	 	name: "main", path: "main", meta: { auth: true }, component: getComponent("common/subroute"),children: [
						{ name: "main-page1", path: "page1",meta: { auth: true },component: getComponent("admin/page/main/page1")}, 
						{ name: "main-page2", path: "page2", meta: { auth: true }, component: getComponent("admin/page/main/page2") }, 
						{ name: "main-page3", path: "page3", meta: { auth: true }, component: getComponent("admin/page/main/page3") }, 
						{ name: "main-routes-url", path: "page4", meta: { auth: true}, component: getComponent("common/iframe") }
					]
			     }, 
	            // 用户模块
				{
					name: "users", path: "users", meta: { auth: true }, component: getComponent("common/subroute"),children: [
					    // 用户帐号
						{
							name: "account", path: "account", meta: { auth: true },component: getComponent("common/subroute"),children: [
								{ name: "users-list", path: "list",meta: { auth: true }, component: getComponent("admin/page/user/list") },
								{ name: "users-add", path: "add",meta: { auth: true }, component: getComponent("admin/page/user/add") },  
								{ name: "users-page1", path: "page1", meta: { auth: true },component: getComponent("admin/page/page1") }, 
								{ name: "users-page2", path: "page2", meta: { auth: true },component: getComponent("admin/page/page2") }, 
								{ name: "users-page3", path: "page3", meta: { auth: true },component: getComponent("admin/page/page3") }, 
								{ name: "users-page4", path: "page4", meta: { auth: true },component: getComponent("admin/page/page4")}
							]
					    },
					    // 用户中心财务
						{
							name: "finance", path: "finance", meta: { auth: true },component: getComponent("common/subroute"),children: [
								{ name: "detailed", path: "detailed", meta: { auth: true }, component: getComponent("admin/page/finance/page1")}, 
								{ name: "recharge", path: "recharge", meta: { auth: true }, component: getComponent("admin/page/finance/page2")}
							]
						},
						// 订单模块
						{
							name: "order", path: "order", meta: { auth: true }, component: getComponent("common/subroute"),children: [
								{ name: "list", path: "list", meta: { auth: true }, component: getComponent("admin/page/order/order")}
							]
						},
						// 代理商 
						{
							name: "agency", path: "agency", meta: { auth: true }, component: getComponent("common/subroute"),children: [
								{ name: "agency-seting", path: "setting", meta: { auth: true }, component: getComponent("admin/page/agency/page1") }, 
								{ name: "terrace-seting", path: "terrace", meta: { auth: true }, component: getComponent("admin/page/agency/page2") }, 
								{ name: "agency-news", path: "news", meta: { auth: true }, component: getComponent("admin/page/agency/page3") }, 
								{ name: "agency-basic", path: "basic", meta: { auth: true }, component: getComponent("admin/page/agency/page4")}
							]
						},
					]
				},
				
		]
	},
	// 路由重定向
	{ path: '/', redirect: '/index/welcome' },
	// 路由重定向
	{ path: '/ucenter', redirect: '/ucenter/login' }

];