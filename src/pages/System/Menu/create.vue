<script lang="ts" setup>
	import { Plus, Refresh } from "@element-plus/icons-vue";
	import { resetForm } from "@/utils/form";
	import type { FormInstance, FormRules } from "element-plus";
	import { deepClone } from "@/utils/index";
	import { Icon } from "@/router/page";
	import { typeList } from "./index";

	const props = defineProps(["data"]);
	const emits = defineEmits(["beforeClose"]);
	// 表单
	const ruleFormRef = ref<FormInstance>();
	interface Form {
		upperMenu: string;
		name: string;
		childMenuName: string;
		permission: string;
		type: string;
		isChildMenu: boolean;
		sort: number;
		status: boolean;
		path: string;
	}
	const form = ref<Form>({
		upperMenu: "",
		name: "",
		childMenuName: "",
		permission: "",
		sort: 0,
		isChildMenu: false,
		status: false,
		type: "page",
		path: ""
	});
	const rules = ref<FormRules<Form>>({
		upperMenu: { required: true, message: "请选择上级菜单", trigger: "change" },
		type: { required: true, message: "请选择菜单类型", trigger: "change" },
		name: { required: true, message: "请输入菜单名称", trigger: "blur" },
		sort: { required: true, message: "请输入菜单排序", trigger: "blur" },
		path: { required: true, message: "请输入(组件/外链)路径", trigger: "blur" }
	});

	interface Menu {
		name?: string;
		icon?: Icon;
		sort?: string;
		type?: string;
		status?: boolean;
		path: string;
		disabled?: boolean;
		children?: Menu[];
	}
	const pages = ref<Menu[]>([]);
	watch(
		() => props.data,
		(val) => {
			if (val) {
				let data = deepClone(val);
				data.unshift({ name: "后台管理系统", path: "/" });
				data.forEach((item: Menu) => {
					item.disabled = item.type === "link" ? true : false;
				});
				pages.value = data;
			}
		},
		{ deep: true, immediate: true }
	);

	// 新增数据
	const submitForm = async (formEl: FormInstance | undefined) => {
		if (!formEl) return;
		await formEl.validate((valid) => {
			if (valid) {
				console.log("新增", form.value);
				emits("beforeClose");
			}
		});
	};
</script>

<template>
	<div class="create">
		<el-form :inline="true" ref="ruleFormRef" :model="form" :rules="rules" :label-width="100">
			<el-form-item label="上级菜单" prop="upperMenu">
				<el-select v-model="form.upperMenu" placeholder="请选择" clearable>
					<el-option v-for="item in pages" :key="item.path" :label="item.name" :value="item.path" :disabled="item.disabled" />
				</el-select>
			</el-form-item>
			<el-form-item label="菜单名称" prop="name">
				<el-input v-model="form.name" placeholder="请输入" clearable />
			</el-form-item>
			<el-form-item label="子级菜单" prop="isChildMenu">
				<el-radio-group v-model="form.isChildMenu">
					<el-radio :value="false">不创建</el-radio>
					<el-radio :value="true">创建</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="子级菜单名称" prop="childMenuName" v-if="form.isChildMenu">
				<el-input v-model="form.childMenuName" placeholder="请输入" clearable />
			</el-form-item>
			<el-form-item label="菜单排序" prop="sort">
				<el-input-number v-model="form.sort" :min="1" :max="10" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="菜单权限" prop="permission">
				<el-input v-model="form.permission" placeholder="请输入" clearable />
			</el-form-item>
			<el-form-item label="菜单状态" prop="status">
				<el-switch v-model="form.status" inline-prompt active-text="启" inactive-text="关" />
			</el-form-item>
			<el-form-item label="菜单类型" prop="type">
				<el-select v-model="form.type" placeholder="请选择" value-key="value">
					<el-option v-for="(label, value) in typeList" :key="value" :label="label" :value="value" />
				</el-select>
			</el-form-item>
			<el-form-item label="(组件/外链)路径" prop="path" :label-width="150">
				<el-input v-model="form.path" placeholder="请输入" clearable />
			</el-form-item>
			<!-- 菜单图标 -->
		</el-form>
		<div class="bottom">
			<el-button :icon="Refresh" @click="resetForm(ruleFormRef)">重置</el-button>
			<el-button type="primary" :icon="Plus" @click="submitForm(ruleFormRef)">新增</el-button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.el-form {
		display: grid;
		grid-gap: 20px;
		grid-template-columns: repeat(2, 1fr);
		.el-form-item {
			margin: 0;
		}
	}
	.bottom {
		margin-top: 20px;
		display: flex;
		justify-content: flex-end;
	}
</style>
