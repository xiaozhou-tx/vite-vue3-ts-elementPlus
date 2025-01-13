import axios from "axios";
import useConfigStore from "@/stores/config";
import { encrypt, decrypt } from "@/utils/sm4";
import { errorCode } from "./config";
import { removeEmpty } from "./index";

const router = useRouter();
const configStore = useConfigStore();
const api = import.meta.env.VITE_APP_URL; // 请求地址
const isEncryption = import.meta.env.VITE_APP_ENCRYPTION; // 是否加密

// 创建一个 axios 实例
const service = axios.create({
	baseURL: api, // 所有的请求地址前缀部分
	timeout: 60000 // 请求超时时间毫秒
});

// 请求拦截器
service.interceptors.request.use(
	(config) => {
		// 设置请求头
		config.headers["Authorization"] = configStore.getToken();
		// 打印请求信息
		const { url, method, data, params } = config;
		const configData = method === "post" ? data : params;
		console.log("请求:", url, method, removeEmpty(configData));
		// 是否加密
		config.headers["isEncryption"] = isEncryption;
		// get加密处理
		if (config.method === "get" && configData && isEncryption == "true") {
			config.url = config.url + "?" + encrypt(removeEmpty(configData));
			config.params = {};
		}
		// post加密处理
		if (config.method === "post" && configData && isEncryption == "true") {
			config.data = encrypt(removeEmpty(configData));
			config.headers["Content-Type"] = "text/plain";
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
// 响应拦截器
service.interceptors.response.use(
	(response) => {
		if (response.status === 200) {
			let { url, method } = response.config;
			// 解密，并且判断返回的是不是字符串
			if (isEncryption == "true" && typeof response.data === "string") response.data = decrypt(response.data);
			let { code, data } = response.data;
			// 如果是get就去掉？后面的内容
			if (method === "get") url = url?.split("?")[0];
			console.log("响应:", url, method, code, data);
			return Promise.resolve(response.data);
		} else {
			return Promise.reject(response);
		}
	},
	(error) => {
		// 响应超时
		if (error.code === "ECONNABORTED") {
			ElMessage.error("请求超时, 请刷新重试");
			return Promise.reject(error);
		}
		// 响应错误
		if (error.response) {
			const { status, data } = error.response;
			// 错误code处理
			if (errorCode[status]) ElMessage.error(errorCode[status]);
			else ElMessage.error(data.message);
			// 登录过期
			if (status === 401) router.push("/login");
		}
		return Promise.reject(error);
	}
);

export default service;
