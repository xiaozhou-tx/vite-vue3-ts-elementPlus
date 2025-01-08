import { Component } from "vue";

const create: Component = defineAsyncComponent(() => import("./create.vue")); // 创建

// 弹窗页面
interface Pages {
	[key: string]: Component;
}
export const pages: Pages = {
	create
};

// 菜单类型
interface TypeList {
	[key: string]: any;
}
export const typeList: TypeList = {
	page: "导航页面",
	extPage: "外部页面",
	link: "外部链接"
};

// 状态列表
interface StatusList {
	[key: string]: boolean;
}
export const statusList: StatusList = {
	启动: true,
	关闭: false
};
