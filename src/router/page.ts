import { RouteRecordRaw } from "vue-router";
import { HomeFilled, UserFilled } from "@element-plus/icons-vue";

// 路由配置
const pages: RouteRecordRaw[] = [
	// 首页
	{
		path: "/home",
		name: "Home",
		component: () => import("@/pages/Home/index.vue"),
		meta: {
			index: "1",
			title: "首页",
			icon: HomeFilled,
			requiresAuth: true
		}
	},
	// 用户
	{
		path: "/user",
		name: "User",
		meta: {
			index: "2",
			title: "用户管理",
			icon: UserFilled
		},
		children: [
			{
				path: "list",
				name: "UserList",
				component: () => import("../pages/User/index.vue"),
				meta: {
					index: "2-1",
					title: "用户列表",
					requiresAuth: true
				}
			}
		]
	}
];

export default pages;
