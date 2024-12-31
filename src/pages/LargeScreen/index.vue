<script lang="ts" setup>
	import screenHeader from "./header.vue";
	import screenLeft from "./left/index.vue";
	import screenMain from "./main.vue";
	import screenRight from "./right/index.vue";
	import VScaleScreen from "v-scale-screen";

	const innerWidth = window.innerWidth;
	const innerHeight = window.innerHeight;
</script>

<template>
	<!-- fullScreen -->
	<v-scale-screen :width="innerWidth" :height="innerHeight">
		<div id="largeScreen">
			<!-- 头部 -->
			<div class="header"><screenHeader /></div>
			<section>
				<!-- 左边 -->
				<div class="left"><screenLeft /></div>
				<!-- 中间 -->
				<div class="map"><screenMain /></div>
				<!-- 右边 -->
				<div class="right"><screenRight /></div>
			</section>
		</div>
	</v-scale-screen>
</template>

<style lang="scss" scoped>
	#largeScreen {
		width: 100%;
		height: 100%;
		color: #fff;
		font-size: 16px;
		background-color: #041022;
		display: flex;
		flex-direction: column;
	}
	.header {
		width: 100%;
		height: 80px;
	}
	section {
		flex: 1;
		padding: 0 20px;
		height: 100%;
		position: relative;
	}
	.map {
		flex: 1;
	}
	.left,
	.right {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 500px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 10px;
		box-sizing: border-box;
	}
	.left {
		left: 20px;
	}
	.right {
		right: 20px;
	}
</style>
