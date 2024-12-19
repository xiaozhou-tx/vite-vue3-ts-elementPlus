import { RouteRecordRaw } from "vue-router";
import { HomeFilled, Tools, Menu } from "@element-plus/icons-vue";

// 路由配置
const pages: RouteRecordRaw[] = [
	// 首页
	{
		path: "/home",
		name: "Home",
		component: () => import("@/pages/Home/index.vue"),
		meta: {
			title: "首页",
			icon: HomeFilled,
			requiresAuth: false
		}
	},
	// 模板功能
	{
		path: "/temFunc",
		name: "TemFunc",
		meta: {
			title: "模板功能",
			icon: Menu
		},
		children: [
			{
				path: "table",
				name: "Table",
				component: () => import("../pages/TemFunc/Table/index.vue"),
				meta: {
					title: "表格模板",
					parentPath: "/temFunc",
					requiresAuth: false
				}
			},
			{
				path: "map",
				name: "Map",
				component: () => import("../pages/TemFunc/Map/index.vue"),
				meta: {
					title: "地图模板",
					parentPath: "/temFunc",
					requiresAuth: false
				}
			},
			{
				path: "echarts",
				name: "Echarts",
				component: () => import("../pages/TemFunc/Echarts/index.vue"),
				meta: {
					title: "图表模板",
					parentPath: "/temFunc",
					requiresAuth: false
				}
			}
		]
	},
	// 系统管理
	{
		path: "/system",
		name: "System",
		meta: {
			index: "3",
			title: "系统管理",
			icon: Tools
		},
		children: [
			{
				path: "user",
				name: "SystemUser",
				component: () => import("../pages/System/User/index.vue"),
				meta: {
					title: "用户管理",
					parentPath: "/system",
					requiresAuth: false
				}
			},
			{
				path: "role",
				name: "SystemRole",
				component: () => import("../pages/System/Role/index.vue"),
				meta: {
					title: "角色管理",
					parentPath: "/system",
					requiresAuth: false
				}
			}
		]
	}
];

export default pages;
