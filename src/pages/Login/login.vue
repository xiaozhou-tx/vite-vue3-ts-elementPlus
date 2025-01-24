<script lang="ts" setup>
	import { User, Lock } from "@element-plus/icons-vue";
	import useConfigStore from "@/stores/config/index.ts";
	import { postLogin } from "@/api/login.ts";
	import type { FormInstance, FormRules } from "element-plus";
	import { submitForm } from "@/utils/form";
	const configStore = useConfigStore();
	const router = useRouter();

	const loading = ref(false);
	const rememberPassword = ref(false); // 记住密码
	const freeLogin = ref(false); // 7天免登录

	const ruleFormRef = ref<FormInstance>();
	interface Form {
		username: string;
		password: string;
	}
	const form = ref<Form>({
		username: "zhouliang",
		password: "zl19991013"
	});

	// 密码安全度验证
	const passwordValidate = (_rule: any, value: string, callback: any) => {
		// 密码强度正则:必须包含数字和字母
		const reg = /^\S*(?=\S*\d)(?=\S*[a-zA-Z])\S*$/;
		if (!reg.test(value)) {
			callback(new Error("密码必须包含数字和字母"));
		} else {
			callback();
		}
	};
	const rules = ref<FormRules<Form>>({
		username: [
			{ required: true, message: "请输入用户名", trigger: "blur" },
			{ max: 16, message: "用户名长度不能超过16位", trigger: "blur" },
			{ min: 4, message: "用户名长度不能少于4位", trigger: "blur" }
		],
		password: [
			{ required: true, message: "请输入密码", trigger: "blur" },
			{ max: 16, message: "密码长度不能超过16位", trigger: "blur" },
			{ min: 6, message: "密码长度不能少于6位", trigger: "blur" },
			{ validator: passwordValidate, trigger: "blur" }
		]
	});

	const login = () => {
		loading.value = true;
		interface Params extends Form {
			expireTime?: string;
		}
		let params: Params = form.value;
		// 7天免登录：传入保存token时间
		if (freeLogin.value) params.expireTime = "7d";
		else delete params.expireTime;
		postLogin(params).then((res) => {
			let data = res.data;
			configStore.setToken(data.token);
			delete data.token;
			// 记住密码：在保存用户信息的时候将加密的密码保存到本地，并在下次登录前将密码显示出来
			if (!rememberPassword.value) delete data.password;
			localStorage.setItem("userInfo", JSON.stringify(data));
			ElMessage.success("登录成功");
			router.push("/");
		});
		loading.value = false;
	};
</script>

<template>
	<!-- 实现记住密码、7天免登录、人机验证、注册 -->
	<div class="login">
		<el-form :model="form" ref="ruleFormRef" label-position="top" :rules="rules">
			<el-form-item prop="username" label="用户名：">
				<el-input clearable size="large" :prefix-icon="User" v-model="form.username" placeholder="用户名" />
			</el-form-item>
			<el-form-item prop="password" label="密码：">
				<el-input type="password" size="large" show-password :prefix-icon="Lock" clearable v-model="form.password" placeholder="密码" />
			</el-form-item>
			<el-form-item>
				<label>
					<input type="checkbox" name="select" v-model="rememberPassword" />
					记住密码
				</label>
				<div style="flex: 1"></div>
				<label>
					<input type="checkbox" name="select" v-model="freeLogin" />
					7天免登录
				</label>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="large" :loading="loading" style="width: 100%" @click="submitForm(ruleFormRef, login)">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<style lang="scss" scoped>
	:deep(.el-input__inner, .el-range-input, .el-button) {
		font-family: MS Shell Dlg \32;
	}
</style>
