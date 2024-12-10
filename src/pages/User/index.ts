import { Component } from "vue";

const create: Component = defineAsyncComponent(() => import("./create.vue")); // 创建
const edit: Component = defineAsyncComponent(() => import("./edit.vue")); // 编辑
const upload: Component = defineAsyncComponent(() => import("./upload.vue")); // 导入

// 弹窗页面
interface Pages {
	[key: string]: Component;
}
export const pages: Pages = {
	create,
	edit,
	upload
};

// 性别列表
interface SexList {
	[key: string]: string;
}
export const sexList: SexList[] = [
	{
		label: "男",
		value: "1"
	},
	{
		label: "女",
		value: "2"
	}
];
