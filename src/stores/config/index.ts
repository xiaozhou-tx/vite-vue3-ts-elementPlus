/**
 * 网站基本配置
 */
import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import { encrypt, decrypt } from "@/utils/sm4";
import pages from "@/router/page";
const title = import.meta.env.VITE_APP_TITLE;

const useConfigStore = defineStore("config", {
	state: () => ({
		title: title, // 网站标题
		token: "", // token
		collapse: false // 侧边栏是否折叠
	}),
	actions: {
		// 修改网站标题
		setTitle(newTitle = title) {
			this.title = newTitle;
			window.document.title = newTitle;
		},
		// 修改token
		setToken(token: string) {
			this.token = token;
			localStorage.setItem("app_token", encrypt(token));
		},
		// 获取token
		getToken() {
			let token = localStorage.getItem("app_token");
			return token ? decrypt(token) : "";
		},
		// 切换侧边栏折叠
		toggleCollapse(collapse?: boolean) {
			if (typeof collapse === "boolean") {
				this.collapse = collapse;
				return;
			}
		},
		// 退出登录
		logout() {
			this.token = "";
			localStorage.clear();
		},
		// 获取导航栏全局搜索数据
		getNavSearch() {
			interface Search {
				text: string;
				type: "page" | "func";
				path?: string;
				func?: Function;
			}
			let restaurants: Search[] = [];
			// 页面搜索
			pages.forEach((page: RouteRecordRaw) => {
				if (page.children) {
					page.children.forEach((child: RouteRecordRaw) => {
						restaurants.push({
							text: (page.meta?.title + " - " + child.meta?.title) as string,
							type: "page",
							path: (page.path + "/" + child.path) as string
						});
					});
				} else {
					restaurants.push({
						text: page.meta?.title as string,
						type: "page",
						path: page.path as string
					});
				}
			});
			return restaurants;
		}
	}
});

export default useConfigStore;
