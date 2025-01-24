// 响应错误code
interface ErrorCode {
	[key: number]: string;
}
export const errorCode: ErrorCode = {
	400: "请求参数错误",
	401: "登录过期，请重新登录",
	403: "没有权限，请联系管理员",
	404: "请求地址不存在",
	500: "服务器内部错误"
};
