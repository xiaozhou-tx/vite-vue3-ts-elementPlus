import { RouteRecordRaw } from "vue-router";
import { HomeFilled, Tools, Histogram, Share } from "@element-plus/icons-vue";
// import Icons from "@/components/Icons/index.vue"; // 图标组件
// import { Icon } from "@/utils/type";

/**
 * @param {string} name - 路由名称
 * @param {Icon} icon - 路由图标
 * @param {string} parentPath - 父级路由路径
 * @param {boolean} requiresAuth - 是否需要登录
 * @param {boolean} fullScreen - 是否是首层展示
 * @param {string} href - 外链地址
 * @param {string} sort - 排序
 * @param {"page" | "extPage" | "link"} type - 类型
 * @param {boolean} status - 状态
 */

// 路由配置
const page: RouteRecordRaw[] = [
	// 首页
	{
		path: "/home",
		name: "Home",
		component: () => import("@/pages/Home/index.vue"),
		meta: {
			name: "首页",
			icon: { components: markRaw(HomeFilled) },
			sort: "1",
			type: "page",
			requiresAuth: true,
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
			icon: { components: markRaw(Share) },
			sort: "3",
			href: "https://www.baidu.com/",
			type: "link",
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
			icon: { components: markRaw(Histogram) },
			fullScreen: true,
			sort: "2",
			type: "extPage",
			status: true,
			requiresAuth: true
		}
	},
	// 系统管理
	{
		path: "/system",
		name: "System",
		meta: {
			name: "系统管理",
			icon: { components: markRaw(Tools) },
			sort: "4",
			type: "page",
			status: true
		},
		children: [
			{
				path: "user",
				name: "User",
				component: () => import("../pages/System/User/index.vue"),
				meta: {
					name: "用户管理",
					parentPath: "/system",
					sort: "2",
					type: "page",
					status: true,
					requiresAuth: true
				}
			},
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
					status: true,
					requiresAuth: true
				}
			}
		]
	}
];

// 根据meta.sort排序,从小到大,支持多级排序
export const sortRouterPage = (routerPage: RouteRecordRaw[]) => {
	routerPage.sort((a, b) => {
		if (a.meta?.sort && b.meta?.sort) {
			return Number(a.meta.sort) - Number(b.meta.sort);
		} else {
			return 0;
		}
	});
	routerPage.forEach((item) => {
		if (item.children) {
			sortRouterPage(item.children);
		}
	});
	return routerPage;
};

export const routerPage = sortRouterPage(page);
