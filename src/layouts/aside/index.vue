<script lang="ts" setup>
	import { routerPage } from "@/router/page";
	import useConfigStore from "@/stores/config/index";
	import { RouteRecordRaw } from "vue-router";
	import { ArrowDown, ArrowUp } from "@element-plus/icons-vue";

	const configStore = useConfigStore();
	const route = useRoute();
	const router = useRouter();
	const title: string = import.meta.env.VITE_APP_TITLE; // 标题

	// 是否展开子菜单
	const isCollapseSub = ref<boolean>(false);
	const collapseSub = ref<string>("");
	// 菜单切换
	const defaultActive = ref<string>(route.path);
	/**
	 * 跳转页面
	 * @param path 地址
	 * @param row 路由内容
	 */
	const goPage = (path: string, row: RouteRecordRaw) => {
		if (row.meta && row.meta.href) {
			window.open(row.meta.href as string, "_blank");
			return;
		}
		let pagePath = path;
		if (row.children) {
			if (row.path != route.meta.parentPath) pagePath = path + "/" + row.children[0].path;
			else {
				isCollapseSub.value = !isCollapseSub.value;
				return;
			}
		}
		router.push(pagePath);
	};
	watch(
		() => route,
		(newValue) => {
			defaultActive.value = newValue.path;
			if (newValue.meta.parentPath) {
				isCollapseSub.value = true;
				collapseSub.value = newValue.meta.parentPath || "";
			} else {
				isCollapseSub.value = false;
				collapseSub.value = "";
			}
		},
		{ deep: true, immediate: true }
	);

	// 监听是否折叠菜单
	const navItemRef = ref<any>(null);
	const collapseSubTop = ref<number>(60);
	watch(
		() => configStore.collapse,
		(newValue) => {
			if (route.meta.parentPath && newValue) {
				nextTick(() => {
					const index = routerPage.findIndex((item: { path: string | undefined }) => item.path === route.meta.parentPath);
					// 获取当前展开导航栏top距离
					if (navItemRef.value && configStore.collapse) {
						collapseSubTop.value = navItemRef.value[index].offsetTop + 60;
					}
				});
			}
		},
		{ deep: true, immediate: true }
	);

	// 获取status是true的数据
	const page = computed(() => {
		return routerPage.filter((item) => item.meta?.status);
	});
</script>

<template>
	<div class="aside">
		<!-- logo -->
		<div class="aside_logo" @click="router.push('/')">
			<img src="@/assets/image/public/logo_white.png" alt="logo" />
			<span :class="configStore.collapse ? 'disabled' : 'visible'">{{ title }}</span>
		</div>
		<!-- 导航栏 -->
		<nav>
			<li v-for="item in page" :key="item.name" ref="navItemRef">
				<div class="nav-item" :class="item.path === defaultActive || item.path === collapseSub ? 'active' : ''" @click="goPage(item.path, item)">
					<el-icon class="icon">
						<component :is="item.meta?.icon?.components" :bootstrapIcon="item.meta?.icon?.name" />
					</el-icon>
					<span :class="configStore.collapse ? 'disabled' : 'visible'">{{ item.meta?.name }}</span>
					<component
						v-if="item.children && item.children.length > 0"
						class="collapseIcon"
						:is="isCollapseSub && collapseSub === item.path ? ArrowUp : ArrowDown"
					></component>
				</div>
				<ul v-if="isCollapseSub && collapseSub === item.path" :class="configStore.collapse ? 'collapse' : 'visible'" :style="{ top: collapseSubTop + 'px' }">
					<li v-for="child in item.children" :key="child.name">
						<div
							class="nav-item sub-nav-item"
							:class="`${item.path}/${child.path}` === defaultActive ? 'active' : ''"
							@click="goPage(`${item.path}/${child.path}`, child)"
						>
							<el-icon class="icon">
								<component :is="child.meta?.icon?.components" :bootstrapIcon="child.meta?.icon?.name" />
							</el-icon>
							<span>{{ child.meta?.name }}</span>
						</div>
					</li>
				</ul>
			</li>
		</nav>
	</div>
</template>

<style lang="scss" scoped>
	// 进入动画
	.visible {
		animation: fadeInLeftBig;
		animation-duration: 0.6s;
	}
	// 退出动画
	.disabled {
		animation: bounceOutLeft;
		animation-duration: 0.8s;
		animation-fill-mode: both;
	}

	.aside {
		height: 100%;
		display: flex;
		flex-direction: column;
		user-select: none;
	}

	.aside_logo {
		display: flex;
		align-items: center;
		padding-left: 17px;
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
		}
	}
	nav {
		flex: 1;
		color: #ffffff;
		position: relative;
		.nav-item {
			margin: 10px;
			height: 45px;
			line-height: 45px;
			border-radius: 4px;
			padding-right: 10px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 10px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
			.icon {
				font-size: 18px;
				position: absolute;
				left: 12px;
			}
			.collapseIcon {
				width: 14px;
			}
			span {
				padding-left: 40px;
			}
			&:hover {
				background-color: #204466;
				&::before {
					content: " ";
					position: absolute;
					left: 0;
					width: 4px;
					height: 100%;
					background-color: #0084ff;
					border-top-left-radius: 4px;
					border-bottom-left-radius: 4px;
				}
			}
		}
		.active {
			background-color: #204466;
			&::before {
				content: " ";
				position: absolute;
				left: 0;
				width: 4px;
				height: 100%;
				background-color: #0084ff;
				border-top-left-radius: 6px;
				border-bottom-left-radius: 6px;
			}
		}
		.collapse {
			position: fixed;
			left: 74px;
			animation: backInLeft;
			animation-duration: 0.8s;
			background-color: #1f2a3d;
			z-index: 1000;
			width: 200px;
			border-radius: 4px;
			span {
				padding-left: 40px;
			}
		}
	}
</style>
