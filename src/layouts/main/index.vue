<script lang="ts" setup></script>

<template>
	<router-view v-slot="{ Component }">
		<Transition name="fade" mode="out-in">
			<component class="main" :is="Component" />
		</Transition>
	</router-view>
</template>

<style lang="scss" scoped>
	/* 进入和离开过渡的过渡效果 */
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s ease;
	}

	.fade-enter-from {
		opacity: 0;
		transform: translateX(-20px);
	}

	.fade-leave-to {
		opacity: 0;
		transform: translateX(20px);
	}
</style>
