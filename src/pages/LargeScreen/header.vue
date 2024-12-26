<script lang="ts" setup>
	// 导航栏
	const selectMenuIndex = ref<number>(-1);
	interface Menu {
		name: string;
		layout: string;
	}
	const menu = ref<Menu[]>([
		{
			name: "菜单一",
			layout: "left start"
		},
		{
			name: "菜单二",
			layout: "left"
		},
		{
			name: "菜单三",
			layout: "left end"
		},
		{
			name: "菜单四",
			layout: "right start"
		},
		{
			name: "菜单五",
			layout: "right"
		},
		{
			name: "菜单六",
			layout: "right end"
		}
	]);
	const selectMenu = (_item: Menu, index: number) => {
		selectMenuIndex.value = index;
	};
</script>

<template>
	<div class="screenHeader">
		<div class="title">大屏可视化</div>
		<div class="menu">
			<div
				class="item"
				:class="[item.layout, selectMenuIndex === index && 'selectMenu']"
				v-for="(item, index) in menu"
				:key="item.name"
				@click="selectMenu(item, index)"
			>
				<span>{{ item.name }}</span>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.screenHeader {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		background: url("@/assets/image/largeScreen/header.png") no-repeat;
		background-size: cover;
		display: flex;
		justify-content: center;
		position: relative;
		user-select: none;
	}
	.title {
		width: 567px;
		font-size: 34px;
		text-align: center;
		margin-top: 16px;
	}
	.menu {
		position: absolute;
		top: 25px;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		.item {
			width: 248px;
			height: 51px;
			background-image: url("@/assets/image/largeScreen/menu.png");
			background-repeat: no-repeat;
			background-size: cover;
			text-align: center;
			box-sizing: border-box;
			cursor: pointer;
			span {
				display: inline-block;
				margin-top: 10px;
			}
			&.left {
				&.end {
					margin-right: calc(567px / 2);
					transform: translateX(0);
				}
			}
			&.right {
				&.start {
					margin-left: calc(567px / 2);
				}
				transform: scaleX(-1);
				span {
					transform: scaleX(-1);
				}
			}
		}
		.selectMenu {
			background-image: url("@/assets/image/largeScreen/selectMenu.png");
		}
	}
</style>
