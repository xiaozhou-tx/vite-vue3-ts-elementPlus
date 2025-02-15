<script lang="ts" setup>
	import { Setting, Search } from "@element-plus/icons-vue";
	import useConfigStore from "@/stores/config";
	import { debounce, fuzzySearch, getImageUrl } from "@/utils/index";
	const configStore = useConfigStore();
	const router = useRouter();
	const route = useRoute();

	// 退出登录
	const logout = () => {
		configStore.logout();
		router.push("/login");
		ElMessage.success("退出成功");
	};

	// 获取面包屑数据
	const breadcrumb = ref<string[]>([]);
	watch(
		() => route.fullPath,
		(newValue) => {
			breadcrumb.value = [];
			if (newValue == "/home") return;
			route.matched.forEach((item) => {
				if (item.meta?.name) breadcrumb.value.push(item.meta.name);
			});
		},
		{ deep: true, immediate: true }
	);

	// 全局搜索执行
	interface Search {
		text: string;
		type: "page" | "func" | "link";
		icon?: any;
		path?: string;
		func?: Function;
	}
	const autocomplete = ref<string>("");
	const restaurants = ref<Search[]>([]);
	// 返回搜索出来的列表
	const querySearch = (queryString: string, cb: any) => {
		let results: Search[] = [];
		let allCode = [" ", "*", "/"];
		// 空字符串、*、/ 搜索全部，其他模糊搜索
		if (queryString.trim() === "" || allCode.includes(queryString)) results = restaurants.value;
		else results = fuzzySearch(restaurants.value, "text", queryString);
		cb(results);
	};
	// 全局搜索选中执行
	const selectSearch = (row: any) => {
		if (row.type === "page") router.push(row.path);
		if (row.type === "func") row.func();
		if (row.type === "link") window.open(row.path as string, "_blank");
		autocomplete.value = "";
	};

	// 初始化全局搜索数据
	onMounted(() => {
		// 获取导航栏全局搜索数据
		restaurants.value = configStore.getNavSearch();
		getFuncSearch();
	});
	// 添加功能搜素数据
	const getFuncSearch = () => {
		let funcArray: Search[] = [
			{
				text: "退出登录",
				type: "func",
				func: logout
			}
		];
		restaurants.value.push(...funcArray);
	};
</script>

<template>
	<div class="header">
		<!-- 操作侧边栏、面包屑 -->
		<div class="header_left header_item">
			<img
				class="operationAside"
				:src="getImageUrl(configStore.collapse ? 'header/expand.png' : 'header/fold.png')"
				@click="configStore.toggleCollapse(!configStore.collapse)"
			/>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item v-for="item in breadcrumb" :key="item">{{ item }}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!-- 搜索执行、用户信息 -->
		<div class="header_right header_item">
			<el-autocomplete
				v-model="autocomplete"
				value-key="text"
				:fetch-suggestions="debounce(querySearch, 500)"
				:trigger-on-focus="false"
				clearable
				@select="selectSearch"
				placeholder="请输入"
				highlight-first-item
				style="width: 200px"
			>
				<template #prefix>
					<el-icon><Search /></el-icon>
				</template>
				<template #default="{ item }">
					<div class="autocompleteValue">
						<el-icon>
							<component :is="item.icon?.components || Setting" :name="item.icon?.name" :type="item.icon?.type" />
						</el-icon>
						<span>{{ item.text }}</span>
					</div>
				</template>
			</el-autocomplete>
			<el-dropdown trigger="click">
				<el-avatar shape="square" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click="logout()">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.header {
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
		user-select: none;
	}
	.header_item {
		display: flex;
		align-items: center;
		gap: 20px;
	}
	.operationAside {
		height: 30px;
		cursor: pointer;
	}
	.el-avatar {
		cursor: pointer;
	}
	.autocompleteValue {
		display: flex;
		align-items: center;
		gap: 4px;
	}
</style>
