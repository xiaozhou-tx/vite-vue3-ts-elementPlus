// 图表颜色配置
export let colorList: string[] = ["#0783FA", "#FFD15C"];
interface AreaColor {
	to: string;
	from: string;
	color: string;
}
export let areaColorList: AreaColor[] = [
	{ to: "rgba(7, 131, 250, 0)", from: "rgba(7, 131, 250, 0.2)", color: "rgba(7, 131, 250, 0.8)" },
	{ to: "rgba(255, 209, 92, 0)", from: "rgba(255, 209, 92, 0.2)", color: "rgba(255, 209, 92, 0.8)" }
];

// 图表x轴数据
export let xAxisData: string[] = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

// 默认图表配置
interface OptionConfig {
	color: string[];
	legend: { [key: string]: any };
	grid: { [key: string]: any };
	tooltip: { [key: string]: any };
	xAxis: { [key: string]: any };
	yAxis: { [key: string]: any };
}

export let optionConfig: OptionConfig = {
	color: colorList,
	legend: {
		top: "5%",
		right: "5%",
		itemWidth: 8,
		itemHeight: 8,
		itemGap: 12,
		textStyle: {
			color: "#94A7BD"
		}
	},
	grid: {
		top: "20%",
		left: "6%",
		right: "6%",
		bottom: "5%",
		containLabel: true
	},
	tooltip: {
		backgroundColor: "rgba(61, 85, 102, 0.2)",
		borderWidth: 1,
		borderColor: "#9DBAE1",
		axisPointer: {
			lineStyle: {
				color: "#9DBAE1"
			}
		},
		textStyle: {
			color: "#fff",
			fontSize: 10
		},

		extraCssText: "box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);"
	},
	xAxis: {
		type: "category",
		boundaryGap: false,
		axisTick: {
			show: false
		},
		axisLine: {
			lineStyle: {
				color: "#94A7BD"
			}
		},
		data: xAxisData
	},
	yAxis: {
		type: "value",
		name: "数量",
		nameTextStyle: {
			fontSize: 14,
			color: "#94A7BD"
		},
		axisLine: {
			lineStyle: {
				color: "#94A7BD"
			}
		},
		splitLine: {
			show: true,
			lineStyle: {
				color: "#182D46",
				type: [2, 3],
				dashOffset: 2
			}
		}
	}
};
