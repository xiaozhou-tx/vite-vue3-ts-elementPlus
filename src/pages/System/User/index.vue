<script lang="ts" setup>
	import { Search, Refresh, EditPen, Delete, Plus, Upload, Download } from "@element-plus/icons-vue";
	import { OptionType, DataType, PageOption } from "@/components/Table/type";
	import { queryForm, resetForm } from "@/utils/form";
	import { pages, sexList } from "./index";
	import type { FormInstance } from "element-plus";
	import { ElMessage } from "element-plus";

	// 表单
	const ruleFormRef = ref<FormInstance>();
	interface Form {
		name: string;
		sex: string;
		date: string[];
	}
	const form = ref<Form>({
		name: "",
		sex: "",
		date: []
	});

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
			label: "用户名",
			prop: "name",
			align: "center",
			showOverflowTooltip: true,
			width: 120
		},
		{
			label: "性别",
			prop: "sex",
			align: "center",
			width: 60,
			slot: "sex"
		},
		{
			label: "个性签名",
			prop: "sign",
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
			data.value = [
				{
					name: "张三",
					sex: "1",
					createTime: "2023-01-01 12:00:00"
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

	// 删除表格项
	const deleteEvent = (type: string, row?: any) => {
		if (type === "current") currentDelete(row);
		if (type === "selection") selectionDelete(selectionList.value);
	};
	// 单项删除
	const currentDelete = (row: any) => {
		console.log("单项删除", row);
		ElMessage({
			type: "success",
			message: "删除成功"
		});
	};
	// 多选删除
	const selectionDelete = (row: any) => {
		ElMessageBox.confirm("是否删除选中的元素?", "删除", {
			confirmButtonText: "删除",
			cancelButtonText: "取消",
			type: "error"
		})
			.then(() => {
				console.log("多选删除", row);
				ElMessage({
					type: "success",
					message: "删除成功"
				});
			})
			.catch(() => {});
	};

	// 导出
	const derived = () => {
		console.log("导出");
	};

	// 弹窗
	interface DialogOptions {
		title: string;
		type: string;
	}
	const visible = ref<boolean>(false);
	const dialogOptions = ref<DialogOptions>({
		title: "",
		type: ""
	});
	const dialogData = ref({});
	// 打开弹窗
	function openDialog(type: string, row?: any) {
		visible.value = true;
		dialogData.value = row;
		dialogOptions.value.type = type;
		let title = "";
		if (type === "create") title = "新增";
		if (type === "edit") title = "编辑";
		if (type === "upload") title = "导入";
		dialogOptions.value.title = title;
	}
	//  关闭弹窗
	const handleClose = (isUpdateData: boolean) => {
		visible.value = false;
		if (isUpdateData === true) getData();
	};
</script>

<template>
	<div class="user">
		<!-- 表单 -->
		<el-form inline ref="ruleFormRef" :model="form">
			<el-form-item label="用户名" prop="name">
				<el-input v-model="form.name" placeholder="请输入" clearable style="width: 200px" />
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-select v-model="form.sex" placeholder="请选择" value-key="value" clearable style="width: 100px">
					<el-option v-for="(label, value) in sexList" :key="value" :label="label" :value="value" />
				</el-select>
			</el-form-item>
			<el-form-item label="注册时间" prop="date">
				<el-date-picker
					v-model="form.date"
					type="daterange"
					range-separator="至"
					start-placeholder="开始时间"
					end-placeholder="结束时间"
					style="width: 220px"
				/>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" :icon="Search" @click="queryForm(ruleFormRef, getData)">查询</el-button>
				<el-button :icon="Refresh" @click="resetForm(ruleFormRef, getData)">重置</el-button>
			</el-form-item>
		</el-form>

		<!-- 表格 -->
		<Table :data="data" :option="option" :loading="loading" :maxHeight="650" isPage :pageOption="pageOption" @selection-table-change="selectionTableChange">
			<template #sex="{ row }">
				<span>{{ sexList[row.sex] }}</span>
			</template>
			<template #operation>
				<el-button type="primary" plain :icon="Plus" @click="openDialog('create')">新增</el-button>
				<el-button type="danger" plain :icon="Delete" :disabled="selectionList.length === 0" @click="deleteEvent('selection')">删除</el-button>
				<el-button type="info" plain :icon="Upload" @click="openDialog('upload')">导入</el-button>
				<el-button type="warning" plain :icon="Download" @click="derived()" :disabled="data.length === 0">导出</el-button>
			</template>
			<template #action="{ row }">
				<el-link type="primary" :underline="false" :icon="EditPen" @click="openDialog('edit', row)">编辑</el-link>
				<el-popconfirm title="是否要删除当前选中的数据？" @confirm="deleteEvent('current', row)">
					<template #reference>
						<el-link type="danger" :underline="false" :icon="Delete">删除</el-link>
					</template>
				</el-popconfirm>
			</template>
		</Table>

		<!-- 弹窗 -->
		<el-dialog
			v-model="visible"
			:title="dialogOptions.title"
			:before-close="handleClose"
			width="800"
			:close-on-press-escape="false"
			:close-on-click-modal="false"
			destroy-on-close
			append-to-body
			draggable
		>
			<component :is="pages[dialogOptions.type]" :data="dialogData" @beforeClose="handleClose(true)" />
		</el-dialog>
	</div>
</template>

<style lang="scss" scoped>
	.user {
		background-color: #fff;
		border-radius: 4px;
		padding: 10px;
	}
</style>
