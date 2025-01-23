// 项目库
interface Library {
	text: string;
	link: string;
}
export const library: Library[] = [
	{
		text: "Vue3",
		link: "https://cn.vuejs.org/"
	},
	{
		text: "TypeScript",
		link: "https://www.tslang.cn"
	},
	{
		text: "ElementPlus",
		link: "https://element-plus-docs.bklab.cn/zh-CN/"
	},
	{
		text: "Vite",
		link: "https://cn.vitejs.dev/"
	}
];

// 标签
import Icons from "@/components/Icons/index.vue"; // 图标组件
import { Icon } from "@/utils/type";
interface Labels extends Library {
	icon: Icon;
}
export const labels: Labels[] = [
	{
		text: "GitHub",
		icon: { components: markRaw(Icons), type: "iconfont", name: "icon-github" },
		link: "https://github.com/xiaozhou-tx"
	},
	{
		text: "Gitee",
		icon: { components: markRaw(Icons), type: "iconfont", name: "icon-gitee" },
		link: ""
	},
	{
		text: "CSDN",
		icon: { components: markRaw(Icons), type: "iconfont", name: "icon-csdn" },
		link: "https://blog.csdn.net/qq_63744898?type=blog"
	},
	{
		text: "juejin",
		icon: { components: markRaw(Icons), type: "iconfont", name: "icon-juejin" },
		link: "https://juejin.cn/user/1357271593916000"
	}
];
