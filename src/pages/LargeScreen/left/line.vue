<script lang="ts" setup>
	import { ECBasicOption } from "echarts/types/dist/shared";
	import { areaColorList, xAxisData, optionConfig } from "../config.ts";

	// 数据
	interface Data {
		name: string;
		data: number[];
	}
	let data = ref<Data[]>([]);
	const options = ref<ECBasicOption>({});

	// 获取图表实例
	let echartsRef = ref();
	const getEchartsRef = (instance: any) => {
		echartsRef.value = instance;
	};

	// 模拟数据
	const setData = () => {
		// 隐藏loading
		echartsRef.value.hideLoading();
		data.value = [
			{
				name: "数据1",
				data: xAxisData.map(() => Math.floor(Math.random() * 100))
			},
			{
				name: "数据2",
				data: xAxisData.map(() => Math.floor(Math.random() * 100))
			}
		];
		let series: any = [];
		series = data.value.map((item: Data, index: number) => {
			return {
				name: item.name,
				type: "line",
				smooth: true,
				showSymbol: false,
				symbolSize: 4,
				areaStyle: {
					color: {
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: areaColorList[index].from
							},
							{
								offset: 1,
								color: areaColorList[index].to
							}
						],
						global: false
					}
				},
				data: item.data
			};
		});
		options.value = {
			...optionConfig,
			tooltip: {
				...optionConfig.tooltip,
				trigger: "axis"
			},
			series
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
