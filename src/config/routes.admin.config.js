// 寻组件封装
const getComponent = name => {
	return resolve => {
		require([`../components/admin/${name}.vue`], resolve)
	}
};
export default [{
		name: "login",
		title: "用户登录页面",
		path: "/login",
		meta: {
			auth: false
		},
		component: getComponent("login")
	}, {
		name: "home",
		path: "/home",
		meta: {
			auth: true
		},
		component: getComponent("page/welcome")
	}, {
		name: "users",
		path: "/users",
		// 路由嵌套
		component: getComponent("common/subroute"),
		children: [
			{
				name: "userlist",
				path: "list",
				meta: {
					auth: true
				},
				component: getComponent("page/user/list")
			}, {
				name: "useradd",
				path: "add",
				meta: {
					auth: true
				},
				component: getComponent("page/user/add")
			}, {
				name: "useredit",
				path: "edit",
				meta: {
					auth: true
				},
				component: getComponent("page/user/edit")
			}
		]
	}, {
		name: "usernew",
		path: "/usernew",
		meta: {
			auth: true
		},
		component: getComponent("page/user/add")
	},
	// 路由重定向
	{
		path: '/',
		redirect: '/login'
	}, {
		name: "page1",
		path: "/page1",
		meta: {
			auth: false
		},
		component: getComponent("page/page1")
	}, {
		name: "page2",
		meta: {
			auth: false
		},
		path: "/page2",
		component: getComponent("page/page2")
	}, {
		name: "page3",
		meta: {
			auth: false
		},
		path: "/page3",
		component: getComponent("page/page3")
	}, {
		name: "page4",
		meta: {
			auth: false
		},
		path: "/page4",
		component: getComponent("page/page4")
	}
	// {name: "topic", path: "/topic", component: getComponent("Topic")},
	// // 动态的路由可匹配/detail/a,/detail/b; 参数值会被设置到 this.$route.params;在模版中可以按照下例方式拿到
	// // const User = { template: '<div>User {{ $route.params.id }}</div>'}
	// {name: "detail", path: "/detail/:id", component: getComponent("Detail")},
	// {name: "about", path: "/about", component: getComponent("About")},
	// {name: "login", path: "/login", component: getComponent("Login")},
	// {name: "message", path: "/message", component: getComponent("message")},
	// {name: "page2", path: "/page2", component: getComponent("page2")}
];