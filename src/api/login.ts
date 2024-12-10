import request from "@/utils/request";

// 登录
export function postLogin(data: any) {
	return request({
		url: "/login",
		method: "post",
		data: data
	});
}
