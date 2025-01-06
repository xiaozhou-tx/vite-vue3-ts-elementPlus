import "vue-router";
interface Icon {
	components: any; // markRaw(图标)，组件图标,需要使用markRaw()不然会报警告
	name?: string; // 路由图标 bootstrap图标名
}
declare module "vue-router" {
	interface RouteMeta {
		name?: string; // 路由名称
		icon?: Icon; // 路由图标
		parentPath?: string; // 父级路由路径
		requiresAuth?: boolean; // 是否需要登录
		fullScreen?: boolean; // 是否是首层展示
		href?: string; // 外链地址
		sort?: string; // 排序
		type?: "page" | "extPage" | "link"; // 类型
		status?: boolean; // 状态
	}
}
