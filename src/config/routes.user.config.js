// 寻组件封装
const getComponent = name => {
	return resolve => {
		require([`../components/user/${name}.vue`], resolve)
	}
};
export default [{
		name: "users",
		path: "/users",
		// 路由嵌套
		component: getComponent("common/subroute"),
		children: [{
			name: "userregister",
			path: "register",
			component: getComponent("page/user/register")
		}]
	},
	// 路由重定向
	{
		path: '/defautl.html',
		redirect: '/users/register'
	}
];