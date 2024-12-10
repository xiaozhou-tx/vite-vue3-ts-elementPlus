import { Router } from "vue-router";
import pinia from "@/stores";
import useConfigStore from "@/stores/config/index.ts";

const title = import.meta.env.VITE_APP_TITLE;

const guards = (router: Router) => {
	const configStore = useConfigStore(pinia);
	// 前置守卫
	router.beforeEach((to, _from) => {
		// 动态设置网站标题
		const newTitle = `${title} - ${to.meta.title}`;
		configStore.setTitle(newTitle || title);
		// 判断是否需要登录
		if (to.meta.requiresAuth && !configStore.getToken()) {
			return {
				path: "/login"
			};
		}
	});
};

export default guards;
