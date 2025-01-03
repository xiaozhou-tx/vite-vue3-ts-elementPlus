<script lang="ts" setup>
	import screenHeader from "./header.vue";
	import screenLeft from "./left/index.vue";
	import screenMain from "./main/index.vue";
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
				<div class="center"><screenMain /></div>
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
		position: relative;
	}
	.header {
		width: 100%;
		height: 80px;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 2;
	}
	section {
		flex: 1;
		height: 100%;
		position: relative;
	}
	.center {
		width: 100%;
		height: 100%;
	}
	.left,
	.right {
		position: absolute;
		top: 80px;
		bottom: 0;
		width: 24%;
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 10px;
		box-sizing: border-box;
		z-index: 2;
	}
	.left {
		left: 10px;
	}
	.right {
		right: 10px;
	}
</style>
