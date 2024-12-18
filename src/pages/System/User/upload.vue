<script lang="ts" setup>
	import { UploadFilled } from "@element-plus/icons-vue";
</script>

<template>
	<div class="upload">
		<el-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
			<el-icon class="el-icon--upload"><upload-filled /></el-icon>
			<div class="el-upload__text">
				将文件拖放到此处或
				<em>单击上传</em>
			</div>
		</el-upload>
	</div>
</template>

<style lang="scss" scoped></style>
