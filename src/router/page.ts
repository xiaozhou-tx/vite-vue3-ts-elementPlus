import { RouteRecordRaw } from "vue-router";
import { HomeFilled, Tools } from "@element-plus/icons-vue";

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
	// 系统管理
	{
		path: "/system",
		name: "System",
		meta: {
			index: "2",
			title: "系统管理",
			icon: Tools
		},
		children: [
			{
				path: "user",
				name: "SystemUser",
				component: () => import("../pages/System/User/index.vue"),
				meta: {
					index: "2-1",
					title: "用户管理",
					parentPath: "/system",
					requiresAuth: true
				}
			},
			{
				path: "role",
				name: "SystemRole",
				component: () => import("../pages/System/Role/index.vue"),
				meta: {
					index: "2-2",
					title: "角色管理",
					parentPath: "/system",
					requiresAuth: true
				}
			}
		]
	}
];

export default pages;
