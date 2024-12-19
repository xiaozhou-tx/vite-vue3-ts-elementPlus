<script lang="ts" setup>
	import { EditPen, Delete, Plus, Upload, Download } from "@element-plus/icons-vue";
	import { OptionType, DataType, PageOption } from "@/components/Table/type";

	// 表格
	const option = ref<OptionType[]>([
		{
			type: "selection",
			label: "选择",
			align: "center",
			width: 60
		},
		{
			type: "index",
			label: "序号",
			align: "center",
			width: 60
		},
		{
			label: "内容",
			prop: "content",
			align: "center",
			showOverflowTooltip: true
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
			data.value = [
				{
					content: "-"
				}
			];
			pageOption.value.pageTotal = data.value.length;
			loading.value = false;
		}, 1000);
	};
	getData();

	// 多选表格
	let selectionList = ref<any[]>([]);
	const selectionTableChange = (val: any) => {
		selectionList.value = val;
	};

	// 编辑
	const editData = (row: any) => {
		console.log("编辑", row);
	};
	// 删除
	const deleteData = (row: any) => {
		console.log("删除", row);
	};
</script>

<template>
	<div class="tablePage">
		<Table :data="data" :option="option" :loading="loading" :maxHeight="650" isPage :pageOption="pageOption" @selection-table-change="selectionTableChange">
			<template #operation>
				<el-button type="primary" plain :icon="Plus">新增</el-button>
				<el-button type="danger" plain :icon="Delete" :disabled="selectionList.length === 0">删除</el-button>
				<el-button type="info" plain :icon="Upload">导入</el-button>
				<el-button type="warning" plain :icon="Download" :disabled="data.length === 0">导出</el-button>
			</template>
			<template #action="{ row }">
				<el-link type="primary" :underline="false" :icon="EditPen" @click="editData(row)">编辑</el-link>
				<el-link type="danger" :underline="false" :icon="Delete" @delete="deleteData(row)">删除</el-link>
			</template>
		</Table>
	</div>
</template>

<style lang="scss" scoped>
	.tablePage {
		background-color: #fff;
		border-radius: 4px;
		padding: 10px;
	}
</style>
