// 图标类型定义
export interface Icon {
	components: any; // markRaw(组件图标):组件图标，需要配合使用markRaw()不然会报警告
	type?: "iconfont" | "bootstrapIcon"; // 图标类型
	name?: string; // 图标名：iconfont：icon-xxx，项目前缀icon-，bootstrapIcon：bi-xxx
}
