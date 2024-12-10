// 表格配置项
export interface Props {
	option: OptionType[]; // 配置项
	data: DataType[]; // 数据
	border?: boolean; // 是否显示边框, 默认为true
	loading?: boolean; // 是否显示加载中, 默认为false
	stripe?: boolean; // 是否显示斑马纹, 默认为false
	emptyData?: string; // 空数据默认展示内容
	maxHeight?: string | number; // 表格最大高度
	highlightCurrentRow?: boolean; // 是否高亮当前行, 默认为false
	selectKey?: string; // 多选框的key值
	noSelectableList?: any[]; // 禁用可选择的行, 传入多选框的key值['key1','key2'...], 必须搭配selectKey使用
	isExpand?: boolean; // 是否展开行, 默认为false, 需要配合具名expand插槽使用
	showSummary?: boolean; // 是否显示合计行, 默认为false
	summaryList?: any[]; // 需要合计的表格项, 必须搭配showSummary使用
	isPage?: boolean; // 是否分页, 默认为false
	pageOption?: PageOption; // 分页配置项
	pageSizes?: number[]; // 每页显示条数选项, 默认为[10, 20, 30, 40, 50, 100, 200, 500]
}

export interface DataType {
	[propName: string]: any;
}

// 分页配置项
export interface PageOption {
	pageCurrent: number; // 当前页码, 默认为1
	pageSize: number; // 每页显示条数, 默认为10
	pageTotal: number; // 总条数, 默认为0
	size?: "small" | "default" | "large"; // 分页大小,可选值为 small / default / large, 默认为default
	background?: boolean; // 是否显示背景, 默认为true
	align?: "left" | "center" | "right"; // 分页对齐方式,可选值为 left / center / right, 默认为right
}

// 表格项配置项
export interface OptionType {
	type?: "index" | "selection"; // 类型：index-序号、selection-多选
	prop?: string; // 属性名
	label?: string; // 标签名
	width?: string | number; // 宽度
	align?: string; // 对齐方式
	showOverflowTooltip?: boolean; // 是否显示溢出提示
	slot?: string; // 插槽名
	fixed?: "left" | "right" | boolean; // 固定位置
	sortable?: boolean; // 是否支持排序
	formatter?: (row: any, column: any, cellValue: any, index: number) => any; // 格式化函数
}
