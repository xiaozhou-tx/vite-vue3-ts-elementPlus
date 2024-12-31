<script lang="ts" setup>
	interface BoxProps {
		title: string;
		contentHeight?: string;
	}
	const props = withDefaults(defineProps<BoxProps>(), {
		title: "标题",
		contentHeight: "100%"
	});
</script>

<template>
	<div class="box">
		<div class="title">
			<div class="text-ellipsis">{{ props.title }}</div>
		</div>
		<div class="content" :style="{ height: contentHeight }" v-if="$slots.default">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.box {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;
		.title {
			width: 100%;
			height: 40px;
			background: url("@/assets/image/largeScreen/titleBox.png") no-repeat;
			background-size: contain;
			font-size: 16px;
			padding-left: 40px;
			overflow: hidden;
			display: flex;
			align-items: center;
			user-select: none;
			div {
				width: 180px;
			}
		}
		.content {
			width: 100%;
			height: 100%;
			background: url("@/assets/image/largeScreen/contentBox.png") no-repeat;
			background-size: 100% 100%;
			overflow: hidden;
		}
	}
</style>
