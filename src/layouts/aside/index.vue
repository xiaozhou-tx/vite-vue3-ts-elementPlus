<script lang="ts" setup>
	import pages from "@/router/page";
	import useConfigStore from "@/stores/config/index";

	const configStore = useConfigStore();
	const route = useRoute();
	const router = useRouter();
	const title: string = import.meta.env.VITE_APP_TITLE; // 标题

	// 菜单切换
	const defaultActive = ref<string>(route.path);
	const menuSelect = (index: string) => {
		if (defaultActive.value === index) return;
		defaultActive.value = index;
	};
	watch(
		() => route.fullPath,
		(newValue) => {
			defaultActive.value = newValue;
		},
		{ deep: true, immediate: true }
	);

	// 监听页面宽度
	const resize = () => {
		if (window.innerWidth < 1000) configStore.toggleCollapse(true);
		else configStore.toggleCollapse(false);
	};
	resize();
	// 监听页面宽度
	window.addEventListener("resize", resize);
	onUnmounted(() => {
		window.removeEventListener("resize", resize);
	});
</script>

<template>
	<div class="aside">
		<!-- logo -->
		<div class="aside_logo" @click="router.push('/')">
			<img src="@/assets/image/public/logo_white.png" alt="logo" />
			<span :class="configStore.collapse ? 'folding' : 'launched'">{{ title }}</span>
		</div>
		<!-- 导航栏 -->
		<nav>
			<el-menu :collapse="configStore.collapse" :default-active="defaultActive" router unique-opened @select="menuSelect">
				<template v-for="item in pages" :key="item.name">
					<!-- 存在子级菜单 -->
					<el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path" popper-class="subMenu">
						<template #title>
							<component class="icon" :is="item.meta?.icon" />
							<span>{{ item.meta?.title }}</span>
						</template>
						<el-menu-item-group v-for="child in item.children" :key="child.name">
							<el-menu-item :index="`${item.path}/${child.path}`">{{ child.meta?.title }}</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
					<!-- 不存在子级菜单 -->
					<el-menu-item v-else :index="item.path">
						<component class="icon" :is="item.meta?.icon" />
						<span>{{ item.meta?.title }}</span>
					</el-menu-item>
				</template>
			</el-menu>
		</nav>
	</div>
</template>

<style lang="scss" scoped>
	.aside {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 20px;
		user-select: none;
	}
	.icon {
		width: 20px;
		height: 20px;
		margin-right: 10px;
	}
	.aside_logo {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		height: 60px;
		cursor: pointer;
		img {
			width: 30px;
			height: 30px;
		}
		span {
			font-size: 20px;
			font-weight: bold;
			color: #ffffff;
			transition: all 0.8s ease;
		}
		.folding {
			display: none;
		}
		.launched {
			display: block;
		}
	}
	nav {
		flex: 1;
	}
	:deep(.el-menu-item-group__title) {
		display: none;
	}
	:deep(.el-menu) {
		background-color: #1f2a3d;
		border-right: 0;
		height: 100%;
	}
	:deep(.el-menu-item),
	:deep(.el-sub-menu__title) {
		background-color: #1f2a3d;
		color: #e6ecf2;
		border-radius: 4px;
		margin: 0 10px;
		margin-bottom: 2px;
		height: 45px;
		line-height: 45px;
		&:hover {
			background-color: #003a8c;
			color: #fff;
		}
		&.is-active {
			background-color: #003a8c;
			color: #fff;
		}
	}
	// 折叠导航栏
	.el-menu--collapse {
		padding: 0;
		.icon {
			margin-right: 0;
		}
		:deep(.el-menu-item),
		:deep(.el-sub-menu__title) {
			margin-left: 4px;
			margin-right: 4px;
		}
		:deep(.el-sub-menu.is-active .el-sub-menu__title) {
			background-color: #003a8c;
			color: #fff;
		}
	}
</style>
