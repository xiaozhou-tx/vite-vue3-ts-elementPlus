<script lang="ts" setup>
	import { ref } from "vue";
	import { library, labels } from "./index";
	import login from "./login.vue"; // 登录
	import register from "./register.vue"; // 注册

	// 标题
	const title: string = import.meta.env.VITE_APP_TITLE;

	// 打开标签
	const opnePage = (item: any) => {
		if (item.link && item.link != "") window.open(item.link, "_blank");
		else ElMessage.warning("暂无链接");
	};

	// 登录注册切换
	const activeName = ref<"login" | "register">("login");
</script>

<template>
	<div class="page">
		<div class="content">
			<div class="left">
				<div class="logo">
					<img src="../../assets/image/public/logo_white.png" alt="" />
					<span>{{ title }}</span>
				</div>
				<div class="left_content">
					<span>&nbsp;&nbsp;&nbsp;&nbsp;该系统是基于</span>
					<el-link v-for="item in library" :key="item.text" :href="item.link" type="primary" target="_blank">&nbsp;{{ item.text }}</el-link>
					<span>&nbsp;的{{ title }}；包含网站、大屏可视化、后台管理系统、小程序等；并且嵌入个人博客系统。</span>
				</div>
				<div class="label">
					<component
						v-for="item in labels"
						:key="item.text"
						:is="item.icon?.components"
						:name="item.icon?.name"
						:type="item.icon?.type"
						@click="opnePage(item)"
					/>
				</div>
			</div>
			<div class="right">
				<el-tabs v-model="activeName">
					<el-tab-pane label="登录" name="login"><login /></el-tab-pane>
					<el-tab-pane label="注册" name="register"><register /></el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.page {
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
			display: flex;
			width: 1000px;
			height: 600px;
			.left,
			.right {
				padding: 20px;
				flex: 1;
			}
			.left {
				background-color: #1f2a3d;
				border-top-left-radius: 10px;
				border-bottom-left-radius: 10px;
				color: #fff;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.logo {
					img {
						width: 20px;
						vertical-align: top;
						margin-right: 5px;
					}
				}
				.left_content {
					font-size: 0;
					word-break: break-all;
					font-size: 24px;
					line-height: 40px;
					padding: 0 20px;
					:deep(.el-link__inner) {
						font-size: 16px;
					}
				}
				.label {
					width: 100%;
					display: flex;
					justify-content: center;
					gap: 20px;
					font-size: 18px;
					cursor: pointer;
				}
			}
			.right {
				background-color: #fff;
				border-top-right-radius: 10px;
				border-bottom-right-radius: 10px;
			}
		}
	}
</style>
