interface ImportMetaEnv extends Readonly<Record<string, string>> {
	readonly VITE_APP_TITLE: string; // 网站标题
	readonly VITE_NAME: string; // 环境名称
	readonly VITE_APP_URL: string; // 请求地址
	readonly VITE_APP_ENCRYPTION: string; // 是否加密
	readonly VITE_SM4_KEY: string; // sm4加密key
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
