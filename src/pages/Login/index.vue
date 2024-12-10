<script lang="ts" setup>
	import { ref } from "vue";
	import { User, Lock } from "@element-plus/icons-vue";
	import useConfigStore from "@/stores/config/index.ts";
	// import { postLogin } from "@/api/login.ts";
	const configStore = useConfigStore();

	const router = useRouter();

	// 登录
	const form = ref({
		userName: "admin",
		password: "123456789"
	});
	const loading = ref(false);
	const login = () => {
		loading.value = true;

		// 模拟登录
		setTimeout(() => {
			loading.value = false;
			configStore.setToken("123456");
			ElMessage.success("登录成功");
			router.push("/");
		}, 1000);

		// let params = form.value;
		// postLogin(params).then((_res) => {
		// loading.value = false;
		// configStore.setToken("123456");
		// ElMessage.success("登录成功");
		// router.push("/");
		// });
	};
</script>

<template>
	<div class="login">
		<div class="content">
			<div class="title">Login</div>
			<el-form :model="form">
				<el-form-item prop="userName">
					<el-input clearable :prefix-icon="User" v-model="form.userName" placeholder="用户名" />
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" show-password :prefix-icon="Lock" clearable v-model="form.password" placeholder="密码" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" :loading="loading" style="width: 100%" @click="login()">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.login {
		width: 100vw;
		height: 100vh;
		background: url("https://picsum.photos/seed/picsum/1920/1080") no-repeat;
		background-attachment: fixed;
		background-size: cover;
		position: relative;
		user-select: none;
		.content {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			padding: 10px 20px;
			border-radius: 10px;
			width: 200px;
			box-shadow: 0 0 10px #666666;
			.title {
				text-align: center;
				font-size: 24px;
				margin: 20px;
			}
		}
	}
	:deep(.el-input__inner, .el-range-input, .el-button) {
		font-family: MS Shell Dlg \32;
	}
</style>
