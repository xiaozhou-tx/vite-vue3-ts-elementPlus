import { RouteRecordRaw } from "vue-router";
import { HomeFilled, Tools, Menu, Histogram, Share } from "@element-plus/icons-vue";

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
			sort: "1"
		}
	},
	// 大屏
	{
		path: "/largeScreen",
		name: "LargeScreen",
		component: () => import("@/pages/LargeScreen/index.vue"),
		meta: {
			title: "大屏",
			icon: Histogram,
			fullScreen: true,
			sort: "2"
		}
	},
	// 百度一下
	{
		path: "/baidu",
		name: "baidu",
		meta: {
			title: "百度一下",
			icon: Share,
			sort: "3",
			href: "https://www.baidu.com/",
			isLink: true
		},
		children: []
	},
	// 模板功能
	{
		path: "/temFunc",
		name: "TemFunc",
		meta: {
			title: "模板功能",
			icon: Menu,
			sort: "4"
		},
		children: [
			{
				path: "table",
				name: "Table",
				component: () => import("../pages/TemFunc/Table/index.vue"),
				meta: {
					title: "表格模板",
					parentPath: "/temFunc",
					sort: "1"
				}
			},
			{
				path: "map",
				name: "Map",
				component: () => import("../pages/TemFunc/Map/index.vue"),
				meta: {
					title: "地图模板",
					parentPath: "/temFunc",
					sort: "2"
				}
			},
			{
				path: "echarts",
				name: "Echarts",
				component: () => import("../pages/TemFunc/Echarts/index.vue"),
				meta: {
					title: "图表模板",
					parentPath: "/temFunc",
					sort: "3"
				}
			}
		]
	},
	// 系统管理
	{
		path: "/system",
		name: "System",
		meta: {
			title: "系统管理",
			icon: Tools,
			sort: "5"
		},
		children: [
			{
				path: "user",
				name: "SystemUser",
				component: () => import("../pages/System/User/index.vue"),
				meta: {
					title: "用户管理",
					parentPath: "/system",
					sort: "1"
				}
			},
			{
				path: "role",
				name: "SystemRole",
				component: () => import("../pages/System/Role/index.vue"),
				meta: {
					title: "角色管理",
					parentPath: "/system",
					sort: "2"
				}
			}
		]
	}
];

export default pages;
