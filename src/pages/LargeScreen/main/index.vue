<script lang="ts" setup>
	import { MapOptions, Options } from "@/components/Map/type";

	const mapOptions = ref<MapOptions>({
		securityJsCode: "dfa87224869aa4d4692c2bb33e680b94", // 安全密钥
		key: "826c5311fce7b57ec88f6745ed1c23d7", // 开发者Key
		plugins: ["AMap.DistrictLayer"]
	});

	const options = ref<Options>({
		zoom: 7,
		center: [117.175, 31.52],
		theme: "light"
	});

	const getMapRef = (AMap: any, map: any) => {
		// 安徽省区域高亮
		getAhArea(AMap, map);
	};
	// 安徽省区域高亮
	const getAhArea = (AMap: any, map: any) => {
		// 创建省市简易行政区图层
		var distProvince = new AMap.DistrictLayer.Province({
			adcode: "340000",
			depth: 1
		});

		// 设置行政区图层样式
		distProvince.setStyles({
			"stroke-width": 20,
			fill: "rgba(255,255,255,1)"
		});
		map.add(distProvince);
	};
</script>

<template>
	<Map :mapOptions="mapOptions" :options="options" @getMapRef="getMapRef" width="100%" height="100%" />
</template>

<style lang="scss" scoped></style>
