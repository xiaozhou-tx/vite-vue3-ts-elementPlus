<script lang="ts" setup>
	import "bootstrap-icons/font/bootstrap-icons.css"; // bootstrap图标
	import "@/assets/iconfont/iconfont.js"; // iconfont图标

	interface Props {
		name: string;
		type: "iconfont" | "bootstrapIcon";
	}
	const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
	<!-- bootstrapIcon -->
	<i v-if="props.type === 'bootstrapIcon'" class="bi" :class="`${props.name}`"></i>
	<!-- iconfont -->
	<svg v-else class="icon" aria-hidden="true">
		<use :xlink:href="`#${props.name}`"></use>
	</svg>
</template>

<style lang="scss" scoped>
	i {
		transform: scale(0.9);
	}
	.icon {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}
</style>
