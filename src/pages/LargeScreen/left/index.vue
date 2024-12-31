<script lang="ts" setup>
	import box from "../components/box.vue";
	import lineBox from "./line.vue"; // 折线图
	import barBox from "./bar.vue"; // 柱状图
	import pieBox from "./pie.vue"; // 饼图
</script>

<template>
	<box title="折线图" content-height="270px"><lineBox /></box>
	<box title="柱状图" content-height="270px"><barBox /></box>
	<box title="饼图" content-height="270px"><pieBox /></box>
</template>

<style lang="scss" scoped></style>
