<script lang="ts" setup>
	import screenHeader from "./header.vue";
	import screenLeft from "./left.vue";
	import screenMain from "./main.vue";
	import screenRight from "./right.vue";
</script>

<template>
	<div class="largeScreen">
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
</template>

<style lang="scss" scoped>
	.largeScreen {
		// width: 1920px;
		// height: 1080px;
		width: 100vw;
		height: 100vh;
		background: url("@/assets/image/largeScreen/bg.png") no-repeat;
		background-size: cover;
		color: #fff;
		font-size: 16px;
		display: flex;
		flex-direction: column;
	}
	.header {
		width: 100%;
		height: 125px;
	}
	section {
		flex: 1;
		display: flex;
		justify-content: space-between;
		gap: 10px;
		padding: 0 20px;
		height: 100%;
	}
	.map {
		flex: 2;
		border: 1px solid red;
	}
	.left,
	.right {
		flex: 1;
		border: 1px solid red;
	}
</style>
