import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import chalk from "chalk"; // 美化控制台输出

export default ({ mode }: any) => {
	const env = loadEnv(mode, process.cwd());
	console.log(chalk.blue.bgRed.bold(env.VITE_NAME)); // 当前环境

	return defineConfig({
		// ****** 基本配置 ******
		base: "/", // 公共路径
		publicDir: resolve(__dirname, "./dist"),

		// ****** 别名配置 ******
		resolve: {
			alias: {
				"@": resolve(__dirname, "src") // 设置 `@` 指向 `src` 目录
			}
		},

		// ****** 预处理器配置 ******
		css: {
			preprocessorOptions: {
				scss: {
					api: "modern-compiler", // 启用 modern 模式
					silenceDeprecations: ["legacy-js-api"] // 禁用警告
				}
			}
		},

		// ****** 插件配置 ******
		plugins: [
			vue(),
			AutoImport({
				resolvers: [ElementPlusResolver()], // 自动导入 Element Plus 组件
				imports: ["vue", "vue-router", "pinia"], // 自动导入 Vue | Vue Router | pinia相关函数
				dts: "src/auto-imports.d.ts"
			}),
			Components({
				resolvers: [ElementPlusResolver()], // 自动导入 Element Plus 组件
				dirs: ["src/components"], // 自动导入 src/components 目录下的组件
				dts: "src/components.d.ts"
			})
		],

		// ****** 开发服务器配置 ******
		server: {
			host: "0.0.0.0", // 主机名
			port: 8088, // 端口号
			open: false, // 是否自动打开浏览器
			cors: true, // 允许跨域
			hmr: true, // 启用热更新
			proxy: {
				// 配置代理 - 在开发环境中使用
				"/api/dev": {
					target: "http://localhost:8088",
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api\/dev/, "")
				},
				// 配置代理 - 在测试环境中使用
				"/api/test": {
					target: "http://localhost:8088",
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api\/test/, "")
				},
				// 配置代理 - 在生产环境中使用
				"/api/pro": {
					target: "http://localhost:8088",
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api\/pro/, "")
				}
			}
		},

		// ****** 生产环境配置 ******
		build: {
			outDir: "dist", // 输出目录
			assetsDir: "assets", // 静态资源目录
			emptyOutDir: true, // 构建时清空输出目录
			cssCodeSplit: true, // 启用/禁用 CSS 代码拆分
			reportCompressedSize: true, // 启用/禁用 gzip 压缩大小报告
			assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
			sourcemap: false, // 构建后是否生成 source map 文件
			chunkSizeWarningLimit: 2000, // 打包后文件大小警告的限制（以 kbs 为单位）
			cssTarget: "chrome61", // 防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式

			// ****** 生产环境打包配置 ******
			terserOptions: {
				compress: {
					drop_console: true, // 生产环境去除 console
					drop_debugger: true // 生产环境去除 debugger
				}
			},
			rollupOptions: {
				output: {
					// 静态文件按类型分包
					chunkFileNames: "static/js/[name]-[hash].js",
					entryFileNames: "static/js/[name]-[hash].js",
					assetFileNames: "static/[ext]/[name]-[hash].[ext]",
					manualChunks(id) {
						// 超大静态资源拆分
						if (id.includes("node_modules")) {
							return id.toString().split("node_modules/")[1].split("/")[0].toString();
						}
					}
				}
			}
		}
	});
};
