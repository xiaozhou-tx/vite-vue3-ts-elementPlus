import type { FormInstance } from "element-plus";

/**
 * 查询表单
 * @param formEl 表单元素
 * @param fun 待执行函数
 */
export const queryForm = (formEl: FormInstance | undefined, fun?: Function) => {
	if (!formEl) return;
	if (fun) fun();
};

/**
 * 重置表单
 * @param formEl 表单元素
 * @param fun 待执行函数
 */
export const resetForm = (formEl: FormInstance | undefined, fun?: Function) => {
	if (!formEl) return;
	formEl.resetFields();
	if (fun) fun();
};

/**
 * 新增表单
 * @param formEl 表单元素
 * @param fun 待执行函数
 */
export const submitForm = async (formEl: FormInstance | undefined, fun?: Function) => {
	if (!formEl) return;
	await formEl.validate((valid) => {
		if (valid && fun) fun();
	});
};
