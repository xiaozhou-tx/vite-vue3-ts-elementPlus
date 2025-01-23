<script lang="ts" setup>
	import { User, Lock } from "@element-plus/icons-vue";
	import useConfigStore from "@/stores/config/index.ts";
	import { postLogin } from "@/api/login.ts";

	const loading = ref(false);
	const rememberPassword = ref(false);

	const form = ref({
		username: "",
		password: ""
	});
	const login = async () => {
		loading.value = true;
		let params = form.value;
		postLogin(params).then((res) => {
			const configStore = useConfigStore();
			const router = useRouter();
			let data = res.data;
			ElMessage.success("登录成功");
			// 存储token
			configStore.setToken(data.token);
			// 跳转首页
			router.push("/");
		});
		loading.value = false;
	};
</script>

<template>
	<!-- 实现记住密码、7天免登录、人机验证、注册 -->
	<div class="login">
		<el-form :model="form" label-position="top">
			<el-form-item prop="username" label="用户名">
				<el-input clearable :prefix-icon="User" v-model="form.username" placeholder="用户名" />
			</el-form-item>
			<el-form-item prop="password" label="密码">
				<el-input type="password" show-password :prefix-icon="Lock" clearable v-model="form.password" placeholder="密码" />
			</el-form-item>
			<el-form-item>
				<label>
					<input type="checkbox" name="select" :value="rememberPassword" />
					记住密码
				</label>
				<div style="flex: 1"></div>
				<label>
					<input type="checkbox" name="select" :value="rememberPassword" />
					7天免登录
				</label>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" :loading="loading" style="width: 100%" @click="login()">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<style lang="scss" scoped>
	:deep(.el-input__inner, .el-range-input, .el-button) {
		font-family: MS Shell Dlg \32;
	}
</style>
