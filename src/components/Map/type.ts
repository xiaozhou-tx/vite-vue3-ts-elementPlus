// 地图
export interface MapProps {
	width?: string; // 宽度
	height?: string; // 高度
	mapOptions?: MapOptions; // 地图配置项
	options?: Options; // 配置项
}

export interface MapOptions {
	securityJsCode: string; // 安全密钥
	key: string; // 开发者Key
	version?: string; // 版本号,默认2.0
	plugins?: string[]; // 需要使用的的插件列表
}

export interface Options {
	viewMode?: string; // 是否为3D地图模式
	zoom?: number; // 初始化地图级别
	center?: number[]; // 初始化地图中心点位置
	theme?: "normal" | "dark" | "light" | "whitesmoke" | "fresh" | "grey" | "graffiti" | "macaron" | "blue" | "darkblue" | "wine"; // 地图样式
}
