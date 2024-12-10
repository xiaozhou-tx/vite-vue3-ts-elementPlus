/**
 * 网站基本配置
 */
import { defineStore } from "pinia";
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
			pages.forEach((item) => {
				let obj: Search = {
					text: "",
					type: "page",
					path: ""
				};
				obj.text = item.meta?.title || "";
				obj.path = item.path || "";
				if (item.children && item.children.length > 0) {
					item.children.forEach((item2) => {
						obj.text += " - " + item2.meta?.title || "";
						obj.path += "/" + item2.path || "";
					});
				}
				restaurants.push(obj);
			});
			return restaurants;
		}
	}
});

export default useConfigStore;
