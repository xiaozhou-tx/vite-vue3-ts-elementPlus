<script lang="ts" setup>
	import { MapProps } from "./type";
	import AMapLoader from "@amap/amap-jsapi-loader";

	interface CustomWindow extends Window {
		_AMapSecurityConfig?: any; // 根据实际情况设置类型
	}

	declare const window: CustomWindow;

	const props = withDefaults(defineProps<MapProps>(), {
		width: "100%",
		height: "100%",
		mapOptions: () => {
			return {
				securityJsCode: "",
				key: "",
				version: "2.0"
			};
		},
		options: () => {
			return {
				viewMode: "3D",
				zoom: 11,
				center: [116.397428, 39.90923],
				theme: "normal"
			};
		}
	});

	const emits = defineEmits(["getMapRef"]);

	let map: any = null;

	onMounted(() => {
		let mapOption = props.mapOptions;
		let options = props.options;
		// 安全密钥
		window._AMapSecurityConfig = {
			securityJsCode: mapOption.securityJsCode
		};
		// 加载地图
		AMapLoader.load({
			key: mapOption.key,
			version: mapOption.version || "",
			plugins: mapOption.plugins
		})
			.then((AMap) => {
				// =========  创建地图对象  =========
				map = new AMap.Map("mapContainer", {
					viewMode: options.viewMode,
					zoom: options.zoom,
					center: options.center,
					mapStyle: `amap://styles/${options.theme}`
				});

				// =========  地图加载完成阶段  =========
				map.on("complete", function () {
					// 获取地图实例,以便于添加插件、状态、地图事件等功能
					emits("getMapRef", AMap, map);
				});
			})
			.catch((e) => {
				console.log(e);
			});
	});

	// 销毁地图
	onUnmounted(() => {
		if (map) {
			//销毁地图，并清空地图容器
			map.destroy();
			//地图对象赋值为null
			map = null;
		}
		//清除地图容器的 DOM 元素
		document.getElementById("mapContainer")?.remove(); //"mapContainer" 为指定 DOM 元素的id
	});
</script>

<template>
	<div id="mapContainer" :style="{ width, height }"></div>
</template>

<style lang="scss" scoped>
	:deep(.amap-logo) {
		display: none !important;
	}
	:deep(.amap-copyright) {
		display: none !important;
	}
</style>
