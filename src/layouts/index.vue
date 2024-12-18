<script lang="ts" setup>
	import comAside from "./aside/index.vue"; // 侧边栏组件
	import comHeader from "./header/index.vue"; // 头部组件
	import comMain from "./main/index.vue"; // 内容组件
	import useConfigStore from "@/stores/config";
	const configStore = useConfigStore();
</script>

<template>
	<el-container>
		<!-- 侧边栏 -->
		<el-aside :class="configStore.collapse ? 'folding' : 'launched'"><com-aside /></el-aside>
		<el-container>
			<!-- 头部 -->
			<el-header><com-header /></el-header>
			<!-- 内容 -->
			<el-main><com-main /></el-main>
		</el-container>
	</el-container>
</template>

<style lang="scss" scoped>
	$header-height: 60px;

	.el-header,
	.el-main {
		padding: 0;
		min-width: 600px;
		z-index: 1;
	}
	.el-aside {
		box-shadow: 2px 0 6px rgba(0, 0, 0, 0.35);
		background-color: #1f2a3d;
		overflow: hidden;
		transition: all 0.8s ease;
		z-index: 2;
	}
	.el-header {
		height: $header-height;
		overflow: hidden;
	}
	.el-main {
		height: calc(100vh - $header-height);
		background-color: #e6ecf2;
		overflow-y: scroll;
		padding: 10px;
	}

	.folding {
		width: 64px;
	}
	.launched {
		width: 200px;
	}
</style>
