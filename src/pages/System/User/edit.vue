<script lang="ts" setup>
	import { EditPen, Refresh } from "@element-plus/icons-vue";
	import { resetForm, submitForm } from "@/utils/form";
	import { deepClone } from "@/utils/index";
	import { sexList } from "./index";
	import type { FormInstance, FormRules } from "element-plus";
	const emits = defineEmits(["beforeClose"]);
	const props = defineProps(["data"]);

	// 表单
	const ruleFormRef = ref<FormInstance>();
	interface Form {
		name: string;
		sex: string;
		sign: string;
	}
	const form = ref<Form>({
		name: "",
		sex: "",
		sign: ""
	});
	const rules = ref<FormRules<Form>>({
		name: { required: true, message: "请输入用户名", trigger: "blur" },
		sex: { required: true, message: "请选择性别", trigger: "change" }
	});

	watch(
		() => props.data,
		(val) => {
			if (val) {
				form.value = deepClone(val);
			}
		},
		{ deep: true, immediate: true }
	);

	// 修改数据
	const addForm = () => {
		console.log("新增", form.value);
		emits("beforeClose");
	};
</script>

<template>
	<div class="edit">
		<el-form :inline="true" ref="ruleFormRef" :model="form" :rules="rules" :label-width="100">
			<el-form-item label="用户名" prop="name">
				<el-input v-model="form.name" placeholder="请输入" clearable />
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-select v-model="form.sex" placeholder="请选择" value-key="value" clearable>
					<el-option v-for="(label, value) in sexList" :key="value" :label="label" :value="value" />
				</el-select>
			</el-form-item>
			<el-form-item label="个性签名" prop="sign">
				<el-input v-model="form.sign" type="textarea" placeholder="请输入" clearable />
			</el-form-item>
		</el-form>
		<div class="bottom">
			<el-button :icon="Refresh" @click="resetForm(ruleFormRef)">重置</el-button>
			<el-button type="primary" :icon="EditPen" @click="submitForm(ruleFormRef, addForm)">编辑</el-button>
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
