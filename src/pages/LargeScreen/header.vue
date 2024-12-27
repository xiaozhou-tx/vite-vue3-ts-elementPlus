<script lang="ts" setup></script>

<template>
	<div class="screenHeader">
		<div class="title">大屏可视化模板</div>
	</div>
</template>

<style lang="scss" scoped>
	.screenHeader {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		background: url("@/assets/image/largeScreen/header.png") no-repeat;
		background-size: 100% 100%;
		display: flex;
		user-select: none;
		justify-content: center;
		padding-top: 10px;
	}
	.title {
		font-size: 26px;
		letter-spacing: 0.1em;
		font-weight: bold;
		text-align: center;
	}
</style>
