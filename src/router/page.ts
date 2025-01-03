import { RouteRecordRaw } from "vue-router";
import { HomeFilled, Tools, Histogram, Share } from "@element-plus/icons-vue";

// 路由配置
const pages: RouteRecordRaw[] = [
	// 首页
	{
		path: "/home",
		name: "Home",
		component: () => import("@/pages/Home/index.vue"),
		meta: {
			name: "首页",
			icon: HomeFilled,
			sort: "1",
			type: "page",
			status: true
		}
	},
	// 大屏
	{
		path: "/largeScreen",
		name: "LargeScreen",
		component: () => import("@/pages/LargeScreen/index.vue"),
		meta: {
			name: "大屏",
			icon: Histogram,
			fullScreen: true,
			sort: "2",
			type: "extPage",
			status: true
		}
	},
	// 百度一下
	{
		path: "/baidu",
		name: "baidu",
		component: () => "",
		meta: {
			name: "百度一下",
			icon: Share,
			sort: "3",
			href: "https://www.baidu.com/",
			type: "link",
			status: true
		}
	},
	// 系统管理
	{
		path: "/system",
		name: "System",
		meta: {
			name: "系统管理",
			icon: Tools,
			sort: "4",
			status: true
		},
		children: [
			// 导航管理
			{
				path: "menu",
				name: "Menu",
				component: () => import("../pages/System/Menu/index.vue"),
				meta: {
					name: "导航管理",
					parentPath: "/system",
					sort: "1",
					type: "page",
					status: true
				}
			},
			{
				path: "user",
				name: "User",
				component: () => import("../pages/System/User/index.vue"),
				meta: {
					name: "用户管理",
					parentPath: "/system",
					sort: "2",
					type: "page",
					status: true
				}
			}
		]
	}
];

export default pages;
