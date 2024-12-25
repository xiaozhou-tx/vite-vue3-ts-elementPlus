<script setup lang="ts">
	import zhCn from "element-plus/es/locale/lang/zh-cn"; //  引入element-plus国际化中文
</script>

<template>
	<el-config-provider :locale="zhCn">
		<el-watermark content="zhouLiang">
			<router-view></router-view>
		</el-watermark>
	</el-config-provider>
</template>

<style scoped lang="scss"></style>
