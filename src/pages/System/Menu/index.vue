<script lang="ts" setup>
	import { EditPen, Delete } from "@element-plus/icons-vue";
	import { OptionType, DataType, PageOption } from "@/components/Table/type";
	import { RouteRecordRaw } from "vue-router";
	import { typeList, statusList } from "./index";
	import type { FormInstance } from "element-plus";
	import routerPage from "@/router/page";
	// 表单
	const ruleFormRef = ref<FormInstance>();
	interface Form {
		name: string;
		type: string;
		status: string;
	}
	const form = ref<Form>({
		name: "",
		type: "",
		status: ""
	});

	// 表格
	const option = ref<OptionType[]>([
		{
			label: "菜单名称",
			prop: "name",
			align: "center",
			showOverflowTooltip: true,
			width: 120
		},
		{
			label: "菜单图标",
			prop: "icon",
			align: "center",
			slot: "icon",
			showOverflowTooltip: true,
			width: 100
		},
		{
			label: "菜单排序",
			prop: "sort",
			align: "center",
			showOverflowTooltip: true,
			width: 100
		},
		{
			label: "菜单类型",
			prop: "type",
			align: "center",
			slot: "type",
			showOverflowTooltip: true,
			width: 100
		},
		{
			label: "菜单状态",
			prop: "status",
			align: "center",
			slot: "status",
			showOverflowTooltip: true,
			width: 100
		},
		{
			label: "组件路径",
			prop: "path",
			align: "center",
			showOverflowTooltip: true
		},
		{
			label: "菜单权限",
			prop: "permission",
			align: "center",
			showOverflowTooltip: true
		},
		{
			label: "创建时间",
			prop: "createTime",
			align: "center",
			showOverflowTooltip: true,
			width: 200
		},
		{
			label: "操作",
			align: "center",
			width: 120,
			slot: "action"
		}
	]);
	const data = ref<DataType[]>([]);
	const pageOption = ref<PageOption>({
		pageCurrent: 1,
		pageSize: 10,
		pageTotal: 0,
		background: true,
		align: "right"
	});

	// 获取数据
	const loading = ref<boolean>(false);
	const getData = () => {
		loading.value = true;
		setTimeout(() => {
			// 将meta中的数据整合出来
			routerPage.forEach((element) => {
				if (!element.children) {
					data.value.push(getMetaData(element));
				} else {
					let obj: any = {
						name: element.meta?.name,
						icon: element.meta?.icon,
						sort: element.meta?.sort,
						status: element.meta?.status,
						children: []
					};
					element.children.forEach((child) => {
						obj.children.push(getMetaData(child, element));
					});
					data.value.push(obj);
				}
			});
			pageOption.value.pageTotal = data.value.length;
			loading.value = false;
		}, 1000);
	};
	getData();
	const getMetaData = (oldData: RouteRecordRaw, fatherData?: RouteRecordRaw) => {
		let newObj: any = {
			name: oldData.meta?.name,
			icon: oldData.meta?.icon,
			sort: oldData.meta?.sort,
			type: oldData.meta?.type,
			status: oldData.meta?.status
		};
		if (oldData.meta?.type != "link") newObj.path = `pages/${String(oldData.name)}/index`;
		if (fatherData) newObj.path = `pages/${String(fatherData.name)}/${String(oldData.name)}/index`;
		return newObj;
	};
</script>

<template>
	<div class="menu">
		<!-- 表单 -->
		<el-form inline ref="ruleFormRef" :model="form">
			<el-form-item label="菜单名称" prop="name">
				<el-input v-model="form.name" placeholder="请输入" clearable style="width: 200px" />
			</el-form-item>
			<el-form-item label="菜单类型" prop="type">
				<el-select v-model="form.type" placeholder="请选择" value-key="value" clearable style="width: 120px">
					<el-option v-for="(label, value) in typeList" :key="value" :label="label" :value="value" />
				</el-select>
			</el-form-item>
			<el-form-item label="菜单状态" prop="status">
				<el-select v-model="form.status" placeholder="请选择" value-key="value" clearable style="width: 100px">
					<el-option v-for="(label, value) in statusList" :key="value" :label="value" :value="label" />
				</el-select>
			</el-form-item>
		</el-form>

		<!-- 表格 -->
		<Table :data="data" :option="option" rowKey="name" :loading="loading" :maxHeight="650" isPage :pageOption="pageOption">
			<template #icon="{ row }">
				<component class="icon" :is="row.icon" />
			</template>
			<template #type="{ row }">
				<span>{{ typeList[row.type] || "-" }}</span>
			</template>
			<template #status="{ row }">
				<el-switch v-model="row.status" inline-prompt disabled active-text="启" inactive-text="关" />
			</template>
			<template #action>
				<el-link type="primary" :underline="false" :icon="EditPen">编辑</el-link>
				<el-popconfirm title="是否要删除当前选中的数据？">
					<template #reference>
						<el-link type="danger" :underline="false" :icon="Delete">删除</el-link>
					</template>
				</el-popconfirm>
			</template>
		</Table>

		<!-- 弹窗 -->
	</div>
</template>

<style lang="scss" scoped>
	.menu {
		background-color: #fff;
		border-radius: 4px;
		padding: 10px;
	}
	.icon {
		height: 18px;
	}
</style>
