<script lang="ts" setup>
	import { Search, Refresh, EditPen, Delete, Plus, Upload, Download } from "@element-plus/icons-vue";
	import { OptionType, DataType, PageOption } from "@/components/Table/type";
	import { pages, sexList } from "./index";
	import type { FormInstance } from "element-plus";

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
			width: 60
		},
		{
			label: "个性签名",
			prop: "sign",
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
					name: "张三",
					sex: "男"
				}
			];
			pageOption.value.pageTotal = data.value.length;
			loading.value = false;
		}, 1000);
	};
	getData();

	// 查询
	const queryForm = (formEl: FormInstance | undefined) => {
		if (!formEl) return;
		getData();
	};

	// 重置
	const resetForm = (formEl: FormInstance | undefined) => {
		if (!formEl) return;
		formEl.resetFields();
		getData();
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
	const handleClose = () => {
		visible.value = false;
	};
</script>

<template>
	<div class="user">
		<!-- 表单 -->
		<el-form :inline="true" ref="ruleFormRef" :model="form">
			<el-form-item label="用户名" prop="name">
				<el-input v-model="form.name" placeholder="请输入" clearable style="width: 200px" />
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-select v-model="form.sex" placeholder="请选择" value-key="value" clearable style="width: 100px">
					<el-option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value" />
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
				<el-button type="primary" :icon="Search" @click="queryForm(ruleFormRef)">查询</el-button>
				<el-button :icon="Refresh" @click="resetForm(ruleFormRef)">重置</el-button>
			</el-form-item>
		</el-form>

		<!-- 表格 -->
		<Table :data="data" :option="option" :loading="loading" :maxHeight="650" isPage :pageOption="pageOption">
			<template #operation>
				<el-button type="primary" plain :icon="Plus" @click="openDialog('create')">新增</el-button>
				<el-button type="danger" plain :icon="Delete">删除</el-button>
				<el-button type="info" plain :icon="Upload" @click="openDialog('upload')">导入</el-button>
				<el-button type="warning" plain :icon="Download">导出</el-button>
			</template>
			<template #action="{ row }">
				<el-link type="primary" :underline="false" :icon="EditPen" @click="openDialog('edit', row)">编辑</el-link>
				<el-link type="danger" :underline="false" :icon="Delete">删除</el-link>
			</template>
		</Table>

		<!-- 弹窗 -->
		<el-dialog v-model="visible" :title="dialogOptions.title" width="800" destroy-on-close :before-close="handleClose">
			<component :is="pages[dialogOptions.type]" :data="dialogData" />
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
