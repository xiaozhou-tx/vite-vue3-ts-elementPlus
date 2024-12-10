<script lang="ts" setup>
	import { Router } from "vue-router";

	const router: Router = useRouter();
</script>

<template>
	<div class="NotFound">
		<i>404</i>
		<div class="goPage">
			<div @click="router.back()">Go Back</div>
			<div @click="router.push('/')">Home</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.NotFound {
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -250px 0 0 -250px;
		height: 500px;
		text-align: center;
		width: 500px;
		font-family: "Oswald", sans-serif;
		user-select: none;
		i {
			font-style: normal;
			font-size: 200px;
			color: #666;
		}
		.goPage {
			display: flex;
			justify-content: center;
			gap: 20px;
			color: #666;
			div {
				height: 30px;
				line-height: 30px;
				padding: 0 10px;
				border-radius: 20px;
				cursor: pointer;
				border: 1px solid #666;
				&:hover {
					background-color: #666;
					color: #fff;
				}
			}
		}
	}
</style>
