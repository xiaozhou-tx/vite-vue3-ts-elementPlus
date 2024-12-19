<script lang="ts" setup>
	import { MapOptions } from "@/components/Map/type";

	// 高德地图配置
	const mapOptions = ref<MapOptions>({
		securityJsCode: "", // 安全密钥
		key: "", // 开发者Key
		plugins: ["AMap.ToolBar", "AMap.Scale"] // 插件
	});

	const getMapRef = (AMap: any, map: any) => {
		// 插入插件
		var toolbar = new AMap.ToolBar(); //创建工具条插件实例
		map.addControl(toolbar); //添加工具条插件到页面
		var scale = new AMap.Scale(); //创建比例尺插件实例
		map.addControl(scale); //添加比例尺插件到页面

		//创建一个 Marker 实例：
		const marker = new AMap.Marker({
			position: new AMap.LngLat(116.39, 39.9), //经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: "北京"
		});
		//将创建的点标记添加到已有的地图实例：
		map.add(marker);
		//创建点标记的点击事件
		marker.on("click", function (e: any) {
			console.log(e);
			alert("你点击了标记点");
		});

		// 绘制多边形
		var path = [new AMap.LngLat(116.368904, 39.913423), new AMap.LngLat(116.387271, 39.912501), new AMap.LngLat(116.398258, 39.9046)];
		var polygon = new AMap.Polygon({
			path: path, //路径
			fillColor: "#fff", //多边形填充颜色
			strokeWeight: 2, //线条宽度，默认为 2
			strokeColor: "red" //线条颜色
		});
		map.add(polygon);
		map.setFitView([polygon]);
		//鼠标移入事件
		polygon.on("mouseover", () => {
			polygon.setOptions({
				//修改多边形属性的方法
				fillOpacity: 0.7, //多边形填充透明度
				fillColor: "#7bccc4"
			});
		});
		//鼠标移出事件
		polygon.on("mouseout", () => {
			polygon.setOptions({
				fillOpacity: 1,
				fillColor: "#fff"
			});
		});

		// 点击事件
		map.on("click", function (ev: any) {
			var lnglat = ev.lnglat;
			alert("您点击的位置：" + `[lat:${lnglat.lat}，lng:${lnglat.lng}]`);
		});
	};
</script>

<template>
	<div class="map">
		<Map :mapOptions="mapOptions" @getMapRef="getMapRef" width="100%" height="100%" />
	</div>
</template>

<style lang="scss" scoped>
	.map {
		width: 100%;
		height: 100%;
	}
</style>
