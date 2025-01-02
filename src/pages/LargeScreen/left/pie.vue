<script lang="ts" setup>
	import { ECBasicOption } from "echarts/types/dist/shared";
	import { optionConfig } from "../config.ts";
	// 数据
	interface Data {
		name: string;
		value: number;
	}
	let data = ref<Data[]>([]);
	const options = ref<ECBasicOption>({});

	// 获取图表实例
	let echartsRef = ref();
	const getEchartsRef = (instance: any) => {
		echartsRef.value = instance;
	};

	const setData = () => {
		// 隐藏loading
		echartsRef.value.hideLoading();
		data.value = [
			{
				name: "数据1",
				value: Math.floor(Math.random() * 100)
			},
			{
				name: "数据2",
				value: Math.floor(Math.random() * 100)
			}
		];
		options.value = {
			color: optionConfig.color,
			grid: optionConfig.grid,
			tooltip: optionConfig.tooltip,
			legend: { ...optionConfig.legend, orient: "vertical", top: "20%", right: "20%" },
			title: {
				text: "统计",
				x: "25.5%",
				y: "center",
				textStyle: {
					color: "#fff"
				}
			},
			series: [
				// 内圆
				{
					type: "pie",
					silent: true,
					center: ["30%", "50%"],
					radius: [0, "30%"],
					itemStyle: {
						color: {
							type: "radial",
							x: 0.5,
							y: 0.5,
							r: 1,
							colorStops: [
								{
									offset: 0,
									color: "rgba(50,171,241, 0)"
								},
								{
									offset: 0.5,
									color: "rgba(50,171,241, .2)"
								},
								{
									offset: 1,
									color: "rgba(50,171,241, 0)"
								}
							]
						}
					},
					label: {
						show: false
					},
					data: [100]
				},
				// 中间装饰
				{
					type: "pie",
					silent: true,
					center: ["30%", "50%"],
					radius: ["36%", "38%"],
					itemStyle: {
						color: {
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [
								{
									offset: 0,
									color: "rgba(102, 204, 255, 0)"
								},
								{
									offset: 0.5,
									color: "#003359"
								},
								{
									offset: 1,
									color: "rgba(102, 204, 255, 0)"
								}
							]
						}
					},
					label: {
						show: false
					},
					data: [100]
				},
				// 数据
				{
					type: "pie",
					center: ["30%", "50%"],
					radius: ["42%", "60%"],
					padAngle: 2,
					label: {
						show: false
					},
					labelLine: {
						show: false
					},
					itemStyle: {
						borderWidth: 3,
						borderColor: "#003359"
					},
					data: data.value
				},
				// 外部装饰
				{
					type: "pie",
					silent: true,
					center: ["30%", "50%"],
					radius: ["66%", "68%"],
					itemStyle: {
						color: "#003359"
					},
					label: {
						show: false
					},
					data: [100]
				},
				// 刻度装饰
				{
					type: "gauge",
					startAngle: 270,
					endAngle: -89.9999,
					center: ["30%", "50%"],
					axisTick: {
						show: false
					},
					axisLabel: {
						show: false
					},
					radius: "98%",
					splitNumber: "52",
					axisLine: {
						show: false,
						lineStyle: {
							width: 10
						}
					},
					splitLine: {
						length: 15,
						lineStyle: {
							width: 2,
							color: "#003359",
							distance: 10
						}
					},
					detail: {
						show: false
					}
				}
			]
		};
	};

	onMounted(() => {
		// 显示loading
		echartsRef.value.showLoading({
			text: "加载中...",
			color: "#94A7BD",
			textColor: "#94A7BD",
			maskColor: "rgba(0, 0, 0, 0.5)"
		});
		setInterval(() => {
			setData();
		}, 3000);
	});
</script>

<template>
	<Echart :options="options" @getEchartsRef="getEchartsRef" />
</template>
