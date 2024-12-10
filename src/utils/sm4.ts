import { sm4 } from "gm-crypt";
import { convertFormat } from "./formatConversio.ts";

// 配置
let sm4Config = {
	mode: "ecb", // 加密模式，可选值："ecb"、"cbc"
	key: import.meta.env.VITE_SM4_KEY // 16字符密钥
	// iv: "" // 16字符初始向量, 仅cbc模式需要
};
let SM4 = new sm4(sm4Config);

let format = "utf8"; // 默认加密格式

// 加密
export function encrypt(content: any): string {
	// 判断content是否为字符串
	let plaintext = "";
	if (typeof content === "string") plaintext = content;
	else plaintext = JSON.stringify(content);
	let ciphertext = SM4.encrypt(plaintext);
	ciphertext = convertFormat(ciphertext, "utf8", format);
	return ciphertext;
}

// 解密
export function decrypt(content: any): string {
	content = convertFormat(content, format, "utf8");
	let plaintext = SM4.decrypt(content);
	// 判断plaintext是否为json字符串
	let ciphertext;
	try {
		ciphertext = JSON.parse(plaintext);
	} catch (e) {
		return (ciphertext = plaintext);
	}
	return ciphertext;
}
