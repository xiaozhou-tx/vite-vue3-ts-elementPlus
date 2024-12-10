import axios from "axios";
import useConfigStore from "@/stores/config";
import { encrypt, decrypt } from "@/utils/sm4";

const router = useRouter();
const configStore = useConfigStore();
const api = import.meta.env.VITE_APP_URL; // 请求地址
const isEncryption = import.meta.env.VITE_APP_ENCRYPTION; // 是否加密

// get 参数加密处理：key和value分别加密，再拼接成字符串
function tansParams(params: { [x: string]: any }) {
	let result = "";
	for (const key of Object.keys(params)) {
		// 参数没值或者不存在就不传参
		if (params[key]) result += `${encrypt(key)}=${encrypt(params[key])}&`;
	}
	return result;
}

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
		console.log("请求:", url, method, configData);
		// get加密处理
		if (config.method === "get" && configData && isEncryption) {
			let url = config.url + "?" + tansParams(configData);
			url = url.slice(0, -1);
			config.params = {};
			config.url = url;
		}
		// post加密处理
		if (config.method === "post" && configData && isEncryption) {
			config.data = encrypt(configData);
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
			const { url, method } = response.config;
			const { code, data } = response.data;
			console.log("响应:", url, method, code, data);
			// 解密，并且判断返回的是不是字符串
			if (isEncryption && typeof data === "string") response.data.data = decrypt(data);
			return Promise.resolve(data);
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
			switch (status) {
				case 401:
					ElMessage.error("登录过期，请重新登录");
					router.push("/login");
					return Promise.reject(error);
				case 403:
					ElMessage.error("没有权限，请联系管理员");
					return Promise.reject(error);
				case 404:
					ElMessage.error("请求地址不存在");
					return Promise.reject(error);
				case 500:
					ElMessage.error("服务器内部错误");
					return Promise.reject(error);
				default:
					ElMessage.error(data.message);
					return Promise.reject(error);
			}
		}
		return Promise.reject(error);
	}
);

export default service;
