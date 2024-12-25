import "vue-router";
declare module "vue-router" {
	interface RouteMeta {
		title?: string; // 路由标题
		icon?: any; // 路由图标
		parentPath?: string; // 父级路由路径
		requiresAuth?: boolean; // 是否需要登录
		fullScreen?: boolean; // 是否是首层展示
		href?: string; // 外链地址
		isLink?: boolean; // 是否是外链
		sort?: string; // 排序
	}
}
