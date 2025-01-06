<script lang="ts" setup>
	import "bootstrap-icons/font/bootstrap-icons.css";

	interface Props {
		bootstrapIcon: string;
	}
	const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
	<i :class="`bi bi-${props.bootstrapIcon}`"></i>
</template>

<style lang="scss" scoped>
	i {
		transform: scale(0.9);
	}
</style>
