import { createWebHashHistory, createRouter, RouteRecordRaw, Router } from "vue-router";
import { routerPage } from "./page"; // 页面路由
import guards from "./guards"; // 路由守卫

const routes: RouteRecordRaw[] = [
	// 登录页
	{
		path: "/login",
		name: "Login",
		component: () => import("@/pages/Login/index.vue"),
		meta: {
			name: "Login",
			requiresAuth: false
		}
	},
	// 页面
	{
		path: "/",
		redirect: "/home",
		component: () => import("@/layouts/index.vue"),
		children: routerPage
	},
	// 失败页
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: () => import("@/pages/NotFound/index.vue"),
		meta: {
			name: "NotFound",
			requiresAuth: false
		}
	}
];

const router: Router = createRouter({
	history: createWebHashHistory(), // 使用 hash 模式路由
	routes, // 路由配置
	strict: true, // 是否严格匹配路由
	scrollBehavior: () => ({ left: 0, top: 0 }) // 路由跳转完成后，页面滚动行为
});

// 路由守卫
guards(router);

export default router;
