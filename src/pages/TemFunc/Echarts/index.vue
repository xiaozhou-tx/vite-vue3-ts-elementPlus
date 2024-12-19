<script lang="ts" setup>
	import { ECBasicOption } from "echarts/types/dist/shared";

	const options = ref<ECBasicOption>({
		title: {
			text: "ECharts 入门示例"
		},
		tooltip: {},
		legend: {
			data: ["销量"]
		},
		xAxis: {
			data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
		},
		yAxis: {},
		series: [
			{
				name: "销量",
				type: "bar",
				data: [5, 20, 36, 10, 10, 20]
			}
		]
	});
	const handlerClick = (e: any) => {
		console.log("e", e);
		alert("点击图表项");
	};
</script>

<template>
	<div class="echarts">
		<Echart :options="options" @handlerClick="handlerClick" width="300px" height="300px" />
	</div>
</template>

<style lang="scss" scoped></style>
