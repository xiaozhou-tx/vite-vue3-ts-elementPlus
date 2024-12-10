import { ECBasicOption } from "echarts/types/dist/shared";
import { ThemeOption } from "echarts/types/src/util/types.js";
import { ThemeType } from "./theme/index";

export interface EchartsProps {
	options: ECBasicOption | null; // 图表配置项
	theme?: ThemeType; // 主题
	customTheme?: ThemeOption; // 自定义主题-JSON格式,如果官方theme相同主题名,会覆盖官方theme主题
	width?: string; // 宽度
	height?: string; // 高度
}
