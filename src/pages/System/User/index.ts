import { Component } from "vue";

const create: Component = defineAsyncComponent(() => import("./create.vue")); // 创建
const edit: Component = defineAsyncComponent(() => import("./edit.vue")); // 编辑
const upload: Component = defineAsyncComponent(() => import("./upload.vue")); // 导入
const derived: Component = defineAsyncComponent(() => import("./upload.vue")); // 导出

// 弹窗页面
interface Pages {
	[key: string]: Component;
}
export const pages: Pages = {
	create,
	edit,
	upload,
	derived
};

// 性别列表
interface SexList {
	[key: string]: any;
}
export const sexList: SexList = {
	1: "男",
	2: "女"
};
