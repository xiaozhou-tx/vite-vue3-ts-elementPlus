<script lang="ts" setup>
	import * as echarts from "echarts";
	import { ECBasicOption, EChartsType } from "echarts/types/dist/shared";
	import { ThemeOption } from "echarts/types/src/util/types.js";
	import { themes } from "./theme/index";
	import { EchartsProps } from "./type";

	let instance: EChartsType = null as unknown as EChartsType;

	const props = withDefaults(defineProps<EchartsProps>(), {
		width: "100%",
		height: "100%"
	});

	const emits = defineEmits(["handlerClick", "getEchartsRef"]);

	const echartsRef = ref(null);

	//  初始化echarts实例
	const initEcharts = () => {
		if (props.options == null) return;
		let theme = props.theme;
		//  注册主题
		if (theme) {
			let themeUrl: ThemeOption;
			if (props.customTheme) themeUrl = props.customTheme;
			else themeUrl = themes[theme];
			echarts.registerTheme(theme, themeUrl);
		}
		//  初始化echarts实例
		instance = echarts.init(echartsRef.value as unknown as HTMLElement, props.theme) as unknown as EChartsType;
		instance.setOption(props.options as ECBasicOption);
		emits("getEchartsRef", instance);
		instance.on("click", handlerClick); //  点击图表项事件
		instance.getZr().on("click", zrHandlerClick); //  点击图表空白区域事件
		instance.on("legendselectchanged", legendselectchanged); //  点击图例事件
		window.onresize = handlerSize;
	};
	onMounted(() => {
		initEcharts();
	});

	//  图表大小变化事件
	function handlerSize() {
		instance.resize();
	}

	// 点击图表空白区域事件
	function zrHandlerClick(params: any): void {
		if (!params.target) emits("handlerClick", { difference: "0", ...params });
	}
	// 点击图表项事件
	function handlerClick(params: any): void {
		emits("handlerClick", { difference: "1", ...params });
	}
	// 点击图例事件
	function legendselectchanged(params: any): void {
		emits("handlerClick", { difference: "2", ...params });
	}

	onBeforeUnmount(() => {
		// 销毁echarts实例
		if (instance) {
			instance.dispose();
			window.removeEventListener("onresize", handlerSize);
		}
	});
	watch(props, () => {
		if (instance) {
			//  刷新数据
			instance.setOption(props.options as ECBasicOption);
		} else {
			initEcharts();
		}
	});
</script>

<template>
	<div class="echart" ref="echartsRef" :style="{ width, height }"></div>
</template>
