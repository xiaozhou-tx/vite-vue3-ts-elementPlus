// 引入所有主题
import vintage from "./vintage.json";
import chalk from "./chalk.json";
import dark from "./dark.json";
import essos from "./essos.json";
import infographic from "./infographic.json";
import macarons from "./macarons.json";
import purplePassion from "./purple-passion.json";
import roma from "./roma.json";
import shine from "./shine.json";
import walden from "./walden.json";
import westeros from "./westeros.json";

// 主题类型
export type ThemeType = "vintage" | "chalk" | "dark" | "essos" | "infographic" | "macarons" | "purple-passion" | "roma" | "shine" | "walden" | "westeros";

// 主题列表
export const themes: { [key in ThemeType | string]: any } = {
	vintage,
	chalk,
	dark,
	essos,
	infographic,
	macarons,
	"purple-passion": purplePassion,
	roma,
	shine,
	walden,
	westeros
};
