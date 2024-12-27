<script lang="ts" setup>
	interface BoxProps {
		title: string;
	}
	const props = withDefaults(defineProps<BoxProps>(), {
		title: "标题"
	});
</script>

<template>
	<div class="box">
		<div class="title">
			<span class="text-ellipsis">{{ props.title }}</span>
		</div>
		<div class="content" v-if="$slots.default">
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
			span {
				width: 180px;
				display: inline-block;
				user-select: none;
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
