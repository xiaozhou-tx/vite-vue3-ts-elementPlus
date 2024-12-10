import { type App } from "vue";
import { increase } from "./increase"; // 数字增长动画
import { lazyImg } from "./lazyImg"; // 图片懒加载
import { debounce, throttle } from "./instruction"; // 防抖节流

/** 挂载自定义指令 */
export function loadDirectives(app: App) {
	app.directive("increase", increase);
	app.directive("lazyImg", lazyImg);
	app.directive("debounce", debounce);
	app.directive("throttle", throttle);
}
